<template>
    <v-container>
        <v-card>
            <v-toolbar color="blue darken-2" dark>
                <v-btn icon @click="backRoute">
                    <v-icon>chevron_left</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-toolbar-title>Уведомление</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
                <h2 class="notification_title">{{notification.title}}</h2>
                <div class="notification_content">
                    {{notification.content}}
                </div>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                notification: {},
            };
        },
        created: function () {
            this.getNotification();

        },
        methods: {
            getNotification() {
                let uri = '/api/notifications/' + this.$route.params.id;
                this.axios.get(uri).then((response) => {
                    this.notification = response.data;
                });
            },
            backRoute() {
                this.$router.go(-1)
            }

        }
    };


</script>


<style>
    .notification_title {
        font-size: 2em;
        margin: 25px;
        border-bottom: 3px dashed #c5c5c5;
        padding: 15px;
    }

    .notification_content {
        font-size: 1.5em;
        margin: 25px;
        padding: 25px;
    }
</style>