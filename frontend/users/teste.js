import * as Yup from 'yup';

async function checkEmail() {
    const schema = Yup.object().shape({
        email: Yup.string().email().matches(/^[a-zA-Z0-9.]+@grupofarina.com.br+$/),
    });

    try {
        await schema.validate('caique.souza@grupofarina.com.br');
        console.log(1);
    } catch (err) {
        console.error(err.errors[0]);
    }
}

checkEmail()
.then(() => {})
.catch((err) => {
    console.log(err);
});