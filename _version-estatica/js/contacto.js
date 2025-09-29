const btnForm = document.getElementById('btn-form');
const inputs = document.querySelectorAll('input, textarea');
const formulario = document.getElementsByClassName('content-form');
const form = document.querySelector('.form')



btnForm.addEventListener('click', e=>{
    e.preventDefault()
    //validacion del formulario desde el html
    if(!form.checkValidity()){
        form.reportValidity()
        return;
    }
    //validacion del formulario para evitar espacios en blanco
    let error = false;
    inputs.forEach(input =>{
        if(input.value.trim() === ""){
            error = true
            input.style.border = 'red solid 1px'
        }else{
            input.style.border = ''
        }
    })
    if(error){
        alert ('Complete todos los campos correctamente')
        return
    }



        //Aviso de mensaje enviado con exito
        const aviso = document.createElement('div');
        aviso.className = 'aviso' //clase aviso para el div
        const avisoContent = document.createElement('div');
        avisoContent.className = 'aviso-content'//clase aviso-content para el div
        const p = document.createElement('p');

        p.textContent = 'Gracias por su mensaje!'

        
        //boton cerrar
        const btnCerrar = document.createElement('button')
        btnCerrar.className = 'btn-cerrar'
        btnCerrar.textContent = 'X'
        
        avisoContent.appendChild(p)
        avisoContent.appendChild(btnCerrar)
        aviso.appendChild(avisoContent)


        document.body.appendChild(aviso)

        //funcion cerrar aviso
        btnCerrar.addEventListener('click',()=>{
            document.body.removeChild(aviso)
        })
    
    form.reset()   
})