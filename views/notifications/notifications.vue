<template>
    <v-container>
        <v-card>
            <v-toolbar color="blue darken-2" dark>
                <v-btn icon @click="backRoute">
                    <v-icon>chevron_left</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-toolbar-title>Уведомления</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
                <v-list two-line>
                    <template v-for="item in notifications">
                        <v-list-tile avatar v-bind:key="item.title"
                                     :to="{name: 'notification_view', params: { id: item.id }}">
                            <v-list-tile-content>
                                <v-list-tile-title v-html="item.title"></v-list-tile-title>
                                <v-list-tile-sub-title v-html="item.created_at"></v-list-tile-sub-title>
                            </v-list-tile-content>
                        </v-list-tile>
                    </template>
                </v-list>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                notifications: {}
            };
        },
        created: function () {
            this.getNotifications();
        },
        methods: {

            getNotifications() {
                this.axios.get('/api/notifications').then((response) => {
                    this.notifications = response.data;
                });
            },
            backRoute() {
                this.$router.go(-1)
            }

        }
    }
</script>