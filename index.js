window.addEventListener('load', ()=>{
    let nombre = document.getElementById('nombre');
    let correo = document.getElementById('correo');
    let telefono = document.getElementById('telefono');
    let mensaje  = document.getElementById('mensaje');
    let campoInvalido = document.getElementById('alertas');
    let botonEnviar = document.getElementById('btn-enviar');

    function envioMail(parametros){
        let datos = {
            from_name: nombre.value,
            message: `Número de contacto: ${telefono.value}
            Correo de contacto: ${correo.value}
            la persona ${nombre.value}, dejo el siguiente mensaje:
            ${mensaje.value}.`
        };
        emailjs.send('service_1adibzr', 'template_xhy5oap', datos).then(function(res){
            console.log('Código:', res.status)
        })
    }
    botonEnviar.addEventListener('click', (e)=>{
        e.preventDefault();
        let warning = '';
        let correcto = `Enviado <i class="far fa-check-circle"></i>` 
        let validadorEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,4})+$/;
        let entrada = false;

        if(telefono.value.length > 18 || telefono.value.length < 10){
            warning += `Teléfono no válido. <br>`
            entrada = true;
        } ;
        if(!validadorEmail.test(correo.value)){
            warning += `Correo no válido. <br>`
            entrada = true;
        };
        if (entrada){
            campoInvalido.innerHTML = warning;
        } else{
            envioMail();
            nombre.value = '';
            correo.value = '';
            telefono.value = '';
            mensaje.value = '';
            campoInvalido.innerHTML = correcto;
        }

    })
})