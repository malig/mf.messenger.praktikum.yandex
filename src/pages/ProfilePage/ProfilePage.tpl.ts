export const tpl = `
    <section class="card profile">
        <div class="ava ava_edit">
            <i class="fa fa-plus" aria-hidden="true"></i>
        </div>
        
        <header class="text-center">
            <h2>Андриенко Алексей</h2>
        </header>
        
        <form 
            action="/pages/MessengerPage"
            onsubmit="eventBus.emit('{{ submitEventName }}', event)"      
        >
            <div class="form-control">
                <label>Имя:</label>
                <input 
                    name="first_name" 
                    type="text" 
                    value="Алексей" 
                    onblur="eventBus.emit('{{ blurEventName }}', event)" 
                    onfocus="eventBus.emit('{{ focusEventName }}', event)"
                />
            </div>
        
            <div class="form-control">
                <label>Фамилия:</label>
                <input 
                    name="second_name" 
                    type="text" 
                    value="Андриенко" 
                    onblur="eventBus.emit('{{ blurEventName }}', event)" 
                    onfocus="eventBus.emit('{{ focusEventName }}', event)"
                />
            </div>
        
            <div class="form-control">
                <label>Ник:</label>
                <input 
                    name="display_name" 
                    type="text" 
                    value="Malig" 
                    onblur="eventBus.emit('{{ blurEventName }}', event)" 
                    onfocus="eventBus.emit('{{ focusEventName }}', event)"
                />
            </div>
        
            <div class="form-control">
                <label>Логин:</label>
                <input 
                    name="login" 
                    type="text" 
                    value="Malig" 
                    onblur="eventBus.emit('{{ blurEventName }}', event)" 
                    onfocus="eventBus.emit('{{ focusEventName }}', event)"
                />
            </div>
        
            <div class="form-control">
                <label>Адрес электронной почты:</label>
                <input 
                    name="email" 
                    type="text" 
                    value="malig@mail.ru" 
                    onblur="eventBus.emit('{{ blurEventName }}', event)" 
                    onfocus="eventBus.emit('{{ focusEventName }}', event)"
                />
            </div>
        
            <div class="form-control">
                <label>Телефон:</label>
                <input 
                    name="phone" 
                    type="tel" 
                    value="8 960 987 55 66" 
                    onblur="eventBus.emit('{{ blurEventName }}', event)" 
                    onfocus="eventBus.emit('{{ focusEventName }}', event)"
                />
            </div>
        
            <div class="form-control">
                <label>Старый пароль:</label>
                <input 
                    name="oldPassword" 
                    type="password" 
                    value="123456" 
                    onblur="eventBus.emit('{{ blurEventName }}', event)" 
                    onfocus="eventBus.emit('{{ focusEventName }}', event)"
                />
            </div>
        
            <div class="form-control">
                <label>Новый пароль:</label>
                <input 
                    name="newPassword" 
                    type="password" 
                    value="123456" 
                    onblur="eventBus.emit('{{ blurEventName }}', event)" 
                    onfocus="eventBus.emit('{{ focusEventName }}', event)"
                />
            </div>
            
            <div>
                {{{ saveButton }}}
                {{{ cancelButton }}}
            </div>
        </form>       
    </section>
`