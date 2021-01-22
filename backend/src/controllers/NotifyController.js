const nodemailer = require('nodemailer');

class NotifyController{
    async sendEmail(req, res){
        const { name, email, phone, topic, subject, year } = req.body;
    
        const transporter = nodemailer.createTransport({
            host: process.env.TRANSPORT_HOST,
            port: process.env.TRANSPORT_PORT,
            secure: false,
            auth: {
                user: process.env.TRANSPORT_EMAIL,
                pass: process.env.TRANSPORT_PASSWORD,
            },
            tls: {
                rejectUnauthorized: false,
            }
        });

        let monitors = [];
        switch (subject) {
            case 'Enfermagem':
                monitors = [process.env.MONITOR1];
                break;
            case 'Informática':
                monitors = [process.env.MONITOR1];
                break;
            case 'Mecânica':
                monitors = [process.env.MONITOR1];
                break;
            case 'Geodésia':
                monitors = [process.env.MONITOR1];
                break;
            case 'Qualidade':
                monitors = [process.env.MONITOR1];
                break;
            case 'Edificações':
                monitors = [process.env.MONITOR1];
                break;
            case 'Humanas':
                monitors = [process.env.MONITOR1];
                break;
            case 'Física e Matemática':
                monitors = [process.env.MONITOR1];
                break;
            case 'Biologia e Química':
                monitors = [process.env.MONITOR1];
                break;
        }

        try {
            await transporter.sendMail({
                from: `Portal Monitoria <${process.env.TRANSPORT_EMAIL}>`,
                to: monitors,
                subject: `Monitoria de ${subject}`,
                html: `<p>Olá monitor, ${name} do ${year} deseja marcar uma monitoria com você, o tema que ele deseja abordar é: <b>${topic}</b>.<h2>Contatos do aluno:</h2><span><b>Email:</b> ${email}</span><br><span><b>Telefone:</b> ${phone}</span><p><a href="https://api.whatsapp.com/send?phone=5519${phone}&text=Ol%C3%A1,%20vamos%20marcar%20a%20sua%20monitoria?" style="padding:10px;background-color: #25D366;color:#fff;"><b>Entrar em contato pelo whatsapp</b></a></p>`,
            });
        } catch (error) {
            return res.status(404).json({message: error});
        }

        return res.status(201).json({message: 'Success!'});
    }
}

module.exports = new NotifyController();