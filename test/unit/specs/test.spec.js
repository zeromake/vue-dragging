const { createVue, destroyVM, triggerEvent } = require('../util')
describe('Test drag', function() {
    let vm
    afterEach(() => {
        destroyVM(vm)
    })
    it('drag list change', function () {
        const colors = [
            { text: "red" },
            { text: "block" }
        ]
        vm = createVue({
            template: `
            <div class="list">
                <div
                v-for="color in colors"
                class="list-item"
                v-dragging="{ list: colors, item: color, group: 'color' }"
                :key="color.text">
                {{ color.text }}
                </div>
            </div>
            `,
            data: function() {
                return {
                    colors: colors
                }
            }
        })
        let obj1 = vm.$el.children[0]
        let obj2 = vm.$el.children[1]
        triggerEvent(obj1, 'dragstart', null, true, true)
        triggerEvent(obj2, 'dragenter', null, true, true)
        expect(colors[0].text).to.equal('block')
        expect(colors[1].text).to.equal('red')
        obj1 = vm.$el.children[0]
        obj2 = vm.$el.children[1]
        triggerEvent(obj1, 'dragstart', null, true, true)
        triggerEvent(obj2, 'dragenter', null, true, true)
        expect(colors[0].text).to.equal('red')
        expect(colors[1].text).to.equal('block')
    })
})
