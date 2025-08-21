const btnForm = document.getElementById('btn-form');
const inputs = document.querySelectorAll('input');
const formulario = document.getElementsByClassName('content-form');

function validacion(){ 
    let validacion = true;
    inputs.forEach(input =>{
        if(input.value.trim() === ""){
            input.style.border = 'red solid 1px'
            validacion = false;

            
        }
       
    })
    return validacion

}

btnForm.addEventListener('click', e=>{
    e.preventDefault()
    if(!validacion()){
        alert("Error complete todos los campos")
    }else{
        alert("Formulario enviado con exito")
    }
})