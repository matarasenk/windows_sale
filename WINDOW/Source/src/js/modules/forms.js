const forms = () => {
    const form = document.querySelectorAll('form'),
        input = document.querySelectorAll('input'),
        phoneInputs = document.querySelectorAll('input[name="user_phone"]');

    phoneInputs.forEach(item => {
        item.addEventListener('input', () => {
            item.value = item.value.replace(/\D/, '');
        });
    });
    
    // Заготовки для экрана загрузки
    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    // Создаём форму отправки запроса на сервер 
    const postData = async (url, data) => {
        document.querySelector('.status').textContent = message.loading;
        let res = await fetch(url, {
            method: "POST",
            body: data
        });

        return await res.text();
    };

    const clearInputs = () => {
        input.forEach(item => {
            item.value = '';
        })
    }

    //Перебираем все элементы и формы
    form.forEach(item => {
        item.addEventListener('submit', (e) => {
            e.preventDefault();

        // Пробую вставить гиф в форму после ввода данных
        // let mainForm = document.getElementsByClassName('form_notice')[0];
        // let varPath = 'https://c.tenor.com/0AVbKGY_MxMAAAAC/check-mark-verified.gif'
        // mainForm.insertAdjacentHTML('beforeend', `<img class='' src=${varPath}/>`)

        // Создаём блок в котором показываем пользователю что, что-то пошло не так
        let statusMessages = document.createElement('div');
            statusMessages.classList.add('status');
            item.appendChild(statusMessages);


            //Собираем все данные из форм
            const formData = new FormData(item);

            // Отправляем запрос на сервер
            postData('assets/server.php', formData)
                .then(res => {
                    console.log(res);
                    statusMessages.textContent = message.success;
                })
                .catch(() => statusMessages.textContent = message.failure)
                .finally(() => {
                    clearInputs();
                    setTimeout(() => {
                        statusMessages.remove();
                    }, 5000);
                });
        });
    });
};

export default forms;