<template>
    <div>
        <textarea v-model="text" @change.prevent="changeText" cols="120" rows="5"></textarea>
    </div>
</template>

<script>
export default {
    data() {
        return {
            text: ''
        }
    },
    methods: {
        changeText() {
            this.$emit('inputText', this.text);
        }
    }
}
</script>