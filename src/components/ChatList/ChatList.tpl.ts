export const tpl = `
    <ul class="chat-list">
      {{#each chats}}
            <li class="chat {{#ifEq ../selected this.id}}chat_selected{{/ifEq}}">
                <div class="ava"></div>

                <div
                  class="chat__body"
                  onclick="eventBus.emit('{{ ../chatSelectEventName }}', {{this.id}})"
                >
                    <span class="chat__name clip">{{this.title}}</span>
                    <div class="chat__time">00:00</div>
                    <span class="chat__last-message clip">(Пусто)</span>
                </div>

                <div class="chat__info">
                    <i
                        class="fa fa-close chat__close"
                        aria-hidden="true"
                        onclick="eventBus.emit('{{ ../chatDeleteEventName }}', {{this.id}})"
                    ></i>
                    <div class="chat__missed-message-count clip">0</div>
                </div>
            </li>
      {{/each}}
    </ul>
`;
