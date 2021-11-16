// models
const logs = require('../models/logs')
const user = require('../models/user')
const roles = require('../models/roles')
const company = require('../models/company')
const services = require('../models/services')
const service_type = require('../models/service_type')
const company_users = require('../models/company_users')

// user belongs to role
user.belongsTo(roles, {
    foreignKey: 'role_id',
    targetKey: 'id'
})

// company has many services
company.hasMany(services, {
    foreignKey: 'company_id',
    sourceKey: 'id'
});

// services belongs to company
services.belongsTo(company, {
    foreignKey: 'company_id',
    targetKey: 'id'
});

// service type has many services
service_type.hasMany(services, {
    foreignKey: 'service_id',
    sourceKey: 'id'
})

// services belongs to service type
services.belongsTo(service_type, {
    foreignKey: 'service_id',
    targetKey: 'id'
})

// company users has many logs 
company.hasMany(logs, {
    foreignKey: 'company_id',
    sourceKey: 'id'
})

// logs belong to company_users
logs.belongsTo(company, {
    foreignKey: 'company_id',
    targetKey: 'id'
})

// services has many logs 
services.hasMany(logs, {
    foreignKey: 'service_id',
    sourceKey: 'id'
})

// log belongs to services 
logs.belongsTo(services, {
    foreignKey: 'service_id',
    targetKey: 'id'
})

// company users have many users
company_users.hasMany(user, {
    foreignKey: 'id',
    sourceKey: 'user_id'
})

// user belongs to company users
user.belongsTo(company_users, {
    foreignKey: 'id',
    targetKey: 'user_id'
})

// company users have many companies
company_users.hasMany(company, {
    foreignKey: 'id',
    sourceKey: 'company_id'
})

// a company belongs to a company users
company.belongsTo(company_users,{
    foreignKey: 'id',
    targetKey: 'company_id'
})