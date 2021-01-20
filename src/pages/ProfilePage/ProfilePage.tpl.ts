export const tpl = `
    <section class="card profile">          
        <div class="profile__header">
            {{{ cancelButton }}}
        </div>
                         
        <div class="profile__content">
            <div class="profile__ava profile_col-space">
                <form onsubmit="eventBus.emit('{{ submitAvaEventName }}', event)">                                        
                    <div class="form-control text-center">                        
                        <div class="ava ava_edit" style="background-image: url({{ avatar }})"></div>
                    </div>                    
                    
                    <div class="form-control">
                        <input id="avatar" type="file" name="avatar" accept="image/*">              
                    </div>                    
                    
                    {{{ saveAvaButton }}}
                </form>                            
            </div> 
    
            <div class="profile__user profile_col-space">
                <form onsubmit="eventBus.emit('{{ submitEventName }}', event)">
                    <div class="form-control">
                        <label>Имя:</label>
                        <input 
                            name="first_name" 
                            type="text" 
                            value="{{ first_name }}" 
                            onblur="eventBus.emit('{{ blurEventName }}', event)" 
                            onfocus="eventBus.emit('{{ focusEventName }}', event)"
                        />
                    </div>
                
                    <div class="form-control">
                        <label>Фамилия:</label>
                        <input 
                            name="second_name" 
                            type="text" 
                            value="{{ second_name }}" 
                            onblur="eventBus.emit('{{ blurEventName }}', event)" 
                            onfocus="eventBus.emit('{{ focusEventName }}', event)"
                        />
                    </div>
                
                    <div class="form-control">
                        <label>Ник:</label>
                        <input 
                            name="display_name" 
                            type="text" 
                            value="{{ display_name }}" 
                            onblur="eventBus.emit('{{ blurEventName }}', event)" 
                            onfocus="eventBus.emit('{{ focusEventName }}', event)"
                        />
                    </div>
                
                    <div class="form-control">
                        <label>Логин:</label>
                        <input 
                            name="login" 
                            type="text" 
                            value="{{ login }}" 
                            onblur="eventBus.emit('{{ blurEventName }}', event)" 
                            onfocus="eventBus.emit('{{ focusEventName }}', event)"
                        />
                    </div>
                
                    <div class="form-control">
                        <label>Адрес электронной почты:</label>
                        <input 
                            name="email" 
                            type="text" 
                            value="{{ email }}" 
                            onblur="eventBus.emit('{{ blurEventName }}', event)" 
                            onfocus="eventBus.emit('{{ focusEventName }}', event)"
                        />
                    </div>
                
                    <div class="form-control">
                        <label>Телефон:</label>
                        <input 
                            name="phone" 
                            type="tel" 
                            value="{{ phone }}" 
                            onblur="eventBus.emit('{{ blurEventName }}', event)" 
                            onfocus="eventBus.emit('{{ focusEventName }}', event)"
                        />
                    </div>      
                    
                    {{{ saveButton }}}                      
                </form>  
            </div> 
    
            <div class="profile__pass">
                <form onsubmit="eventBus.emit('{{ submitPassEventName }}', event)">
                    <div class="form-control">
                        <label>Старый пароль:</label>
                        <input 
                            name="oldPassword" 
                            type="password" 
                            value="{{ oldPassword }}" 
                            onblur="eventBus.emit('{{ blurEventName }}', event)" 
                            onfocus="eventBus.emit('{{ focusEventName }}', event)"
                        />
                    </div>
                
                    <div class="form-control">
                        <label>Новый пароль:</label>
                        <input 
                            name="newPassword" 
                            type="password" 
                            value="{{ newPassword }}" 
                            onblur="eventBus.emit('{{ blurEventName }}', event)" 
                            onfocus="eventBus.emit('{{ focusEventName }}', event)"
                        />
                    </div>   
                    
                    {{{ savePassButton }}}                                     
                </form>
            </div>  
        </div>          
    </section>
`;
