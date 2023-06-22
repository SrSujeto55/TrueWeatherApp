const formLogin = document.querySelector('#ApiForm');

console.log('Al menos si se ejecuta esto');

formLogin.addEventListener('submit', e => {
    e.preventDefault();
    
    const formData = new FormData(formLogin);

    fetch('/setkey', {
        method: 'POST',
        body: formData
    })

    .then(response => {
        if (!response.ok){
            const errMsj = document.querySelector('#errMsj');
            errMsj.textContent = 'Invalid Api Key, try again';
        }else{
            window.location.replace('http://localhost:3000/consult');
        }
    })
})

