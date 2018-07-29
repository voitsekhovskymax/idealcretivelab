
<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <v-card>
                    <v-toolbar color="blue darken-2" dark>
                        <v-btn icon @click="backRoute">
                            <v-icon>chevron_left</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-toolbar-title>Создание нового пользователя</v-toolbar-title>
                        <v-spacer></v-spacer>
                    </v-toolbar>
                    <v-card-text>
                        <v-layout row wrap>
                            <v-flex sm12>
                                <v-text-field label="Имя пользователя (обязательно)" v-model="user.name" prepend-icon="text_format" required></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                            <v-flex sm12>
                                <v-text-field label="Пароль (обязательно)" v-model="user.password" prepend-icon="border_color" required></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row wrap>
                            <v-flex sm12>
                                <v-text-field label="Email (обязательно)" v-model="user.email" prepend-icon="email" required></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex>
                                <v-select v-bind:items="role_list" item-text="name" item-value="value" label="Права доступа (обязательно)" autocomplete single-line
                                          v-model="user.role" auto prepend-icon="person" required></v-select>
                            </v-flex>
                        </v-layout>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn @click="submit" color="primary">
                            Добавить
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                // для БД
                user: {},
                role_list: [{
                    value: 1,
                    name: 'Администратор'
                },
                    {
                        value: 2,
                        name: 'Редактор'
                    }
                ],
                // локальные переменные
                valid: false,
                snackbar: false,
                colorSnackbar: '',
                textSnackbar: "",
                modeSnackbar: 'multi-line',
                timeoutSnackbar: 6000
            };
        },
        methods: {
            submit() {
                console.dir(this.user);
                this.axios.post('/api/users', this.user).then((response) => {
                    this.textSnackbar = "Данные обновились!";
                    this.colorSnackbar = "success";
                    this.snackbar = true;
                }).catch(function (error) {
                    console.log(error);
                })
            },
            backRoute(){
                this.$router.go(-1)
            }
        }

    };
</script>

<style>

</style>