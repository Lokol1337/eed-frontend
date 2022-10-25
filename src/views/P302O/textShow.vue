<!-- <template>
    <div class="container-fluid">
        <textarea v-model="text" @change.prevent="changeText" class="w-100"></textarea>
    </div>
</template> -->

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