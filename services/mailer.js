const nodeMailer = require('nodemailer');
const cronJob = require('cron').CronJob;
const date = new Date();

// models

console.log("Mailer state: Running");

// reports to send to all employees
const repeater = new cronJob('0 * * * * *', () => {
    
    
    const companies = [];
    let mailerEmail;
    let mailerPassword;
    system_configs.findOne()
        .then(data => {
            mailerEmail = data.dataValues.email,
            mailerPassword = data.dataValues.password

            // account setup
            let transporter = nodeMailer.createTransport({
                // maxConnections: 3,
                // pool: true,
                host: 'smtp.gmail.com',
                port: 465,
                // secure: false,
                auth: {
                    // user: mailerEmail,
                    // pass: mailerPassword
                    // user: 'samirmmaliqi@gmail.com',
                    // pass: ''
                }
            })
                if(mailerEmail && mailerPassword)
                service.findAll(
                    {
                        where: {
                                status: 'active'
                            },
                            include: [
                                {
                                    model: serviceType
                                },
                                {
                                    model: company,
                                    include: [{
                                        model: company_users,
                                        include: [{
                                            model: user
                                        }]
                                    }]
                                }
                            ]
                        })
                        .then(data => {
                            serviceCounter = data.length;
                            
                            data.forEach(el => {
                                // service data
                                let serviceId = el.id
                                let serviceCompanyId = el.company_id
                                let serviceName = el.dataValues.service_type.dataValues.name
                                let serviceStartDate = el.start_date
                                let serviceEndDate = el.end_date
                                let serviceUri = el.uri
                                let serviceStatus = el.status
            
                                // company data
                                let companyName = el.company.name;
                                let companyEmail = el.company.email;
                                let reminder = el.company.reminder;
                                let reminderFrequence = el.company.reminder_frequence
                                
                                // the actual date
                                let actualDate = new Date()
            
                                // the end date
                                const endDate = new Date(serviceEndDate)
            
                                // getting the reminder date
                                const reminder_date = new Date(endDate)
                                reminder_date.setDate(reminder_date.getDate() - reminder)
                                
                                
                                // diff days
                                let diffDays = Math.ceil((endDate - actualDate) / (1000 * 60 * 60 * 24));
            
                                // cases that need to be passed to send an email
                                let hasPassedDiffDays = diffDays <= reminder;
                                let isEmailingDay = (diffDays % reminderFrequence == 0) || reminder == diffDays || diffDays == 1;
                                let invalidService = diffDays <= 0;
                                if(invalidService) {
                                    service.update(
                                    {
                                        status: 'passive'
                                    },
                                    {
                                        where: {
                                            id: serviceId
                                        }
                                    })
                                }
                                if(diffDays == reminder){
                                    companies.push(companyName)
                                }

                                // creating logs
                                if(hasPassedDiffDays && isEmailingDay && !invalidService){
                                    logs.create({
                                        company_id: serviceCompanyId,
                                        service_id: serviceId,
                                        date_created: (`${actualDate.getFullYear()}-${actualDate.getMonth() + 1}-${actualDate.getDate() + 1}`),
                                        reminder_date: reminder_date,
                                        company_email: companyEmail
                                    })
                                    .then(data => {
                                        console.log("LogState: created for " + companyName)
                                    })
                                    .catch(err => console.log(err))
                                }
            
                                // getting all the users of a company
                                company_users.findAll({
                                    where: {
                                        company_id: serviceCompanyId
                                    },
                                    include: [user]
                                })
                                    .then(data => {
                                        data.forEach(user => {
            
                                            // user data
                                            let userId = user.dataValues.users[0].dataValues.id
                                            let userName = user.dataValues.users[0].dataValues.name
                                            let userLastName = user.dataValues.users[0].dataValues.last_name
                                            let userEmail = user.dataValues.users[0].dataValues.email
                                           
                                            // sending an email (if it fills the above cases)
                                            if(hasPassedDiffDays && isEmailingDay && !invalidService){
                                                let mailOptions = {
                                                    from: mailerEmail,
                                                    to: userEmail,
                                                    subject: `Expiration ! :/`,
                                                    html: `Dear ${userName},\n\nYour service <b>${serviceName}</b> for your company <b>${companyName}</b> expires within ${diffDays} days.\nReach us for changes at cacttus@info.com !`
                                                }
            
                                                transporter.sendMail(mailOptions, (err, inf) => {               
                                                    if (!err) {
                                                        console.log(`ClientMail: sent for ${userName}`)
                                                    }
                                                    else
                                                        console.log(err)
                                                })
                                            }
                                        })
                                    })
                                    .catch(err => console.log(err))
                            })
            
                            // sending emails to all employees of the providing company
                            if(companies.length > 0)    
                            user.findAll({
                                    where: {
                                        role_id: [1,2],
                                        status: 'active'
                                    }
                                })
                                .then(data => {
                                    data.forEach(el => {
                                        let userName = el.dataValues.name;
                                        let userEmail = el.dataValues.email;
            
                                        let text = '\n- - - - - - - - - - - - - - -\n';
                                        companies.forEach(el => {
                                            text += el + '\n'
                                        })
                                        
                                        let mailOptions = {
                                            from: mailerEmail, 
                                            to: userEmail,
                                            subject: `Expiring  ! :/`,
                                            text: `Hi ${userName}\nSome services that need attention and are about to expire: ${text}`
                                        }
                                        transporter.sendMail(mailOptions, (err, inf) => {
                                            if (!err) {
                                                // console.log(`UserMail: sent for ${userName}`)
                                            }
                                            else
                                                console.log(err)
                                        })
            
                                    })
                                })
                        })
                        .catch(err => console.log(err))
                else
                    console.log("No email configured")
            
                })
        .catch(err => console.log(err))
},null, true, 'Europe/Budapest')
repeater.start()