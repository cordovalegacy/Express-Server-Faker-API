const express = require('express');
const app = express()
const PORT = 8000

const { faker }= require('@faker-js/faker');
const { url } = require('inspector');
const { response } = require('express');


//runs the server



//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const createUser = () => {
    return {
        _id:faker.datatype.uuid(),
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email:faker.internet.email(),
        password:faker.internet.password(),
        phone_number:faker.phone.number()
    }
}
console.log(createUser());


const createCompany = () => ({
            name: faker.company.companyName(),
            _id: faker.datatype.uuid(),
            address: {
                street: faker.address.streetAddress(),
                city: faker.address.cityName(),
                state: faker.address.state(),
                zip_code: faker.address.zipCode(),
                country: faker.address.country()
            },
    });
console.log(createCompany());


//get is an http verb with post, patch, delete, etc..
app.get('api/users/new', (req, res) => {
    const newUser = createUser();
    res.json(newUser);
    console.log('this is an endpoint')
})

app.get('api/companies/new', (req, res) => {
    const newCompany = createCompany();
    res.json(newCompany);
})

app.get('api/user/company' , (req, res) => {
    const newUser = createUser();
    const newCompany = createCompany();
    const responseObj = {
        user: newUser,
        company: newCompany
    };
    res.json(responseObj);
})

app.listen(PORT, () => {
    console.log(`Server is up and running on ${PORT}`)
})

//app.post('/addUser', (req, res) => {
//    console.log(req.body)
//})