const forms = () => {
    const form = document.querySelectorAll('form'),
        input = document.querySelectorAll('input');
    
    // Заготовки для экрана загрузки
    const message = {
        loading: 'Загрузка...',
        success: 'Спасибо! Скоро с Вами свяжемся.',
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