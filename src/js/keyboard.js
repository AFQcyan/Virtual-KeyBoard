export class KeyBoard{
    #switchEl
    #fontSelectEl

    constructor() {
        this.#assignElement()
        this.#addEvent()
    }
    #assignElement(){
        this.#switchEl =  document.getElementById('switch')
        this.#fontSelectEl = document.getElementById('font')
    }

    #addEvent() {
        this.#switchEl.addEventListener('change', (e) => {
            document.documentElement.setAttribute(
                'theme', e.target.checked ? 'dark-mode' : ''
            )
        })

        this.#fontSelectEl.addEventListener('change', (e) => {
            document.body.style.fontFamily = e.target.value
        })
    }
}