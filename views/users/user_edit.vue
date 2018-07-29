<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 >
                <v-card>
                    <v-toolbar color="blue darken-2" dark>
                        <v-btn icon @click="backRoute">
                            <v-icon>chevron_left</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-toolbar-title>Редактирование <b>{{ user.name }}</b></v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon @click="dialogDeleteUser = !dialogDeleteUser" >
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text>
                        <v-form v-model="valid" ref="form" lazy-validation>
                            <div class="imgUser">
                                <img id="urlIMG" :src="user.img" alt="Аватар пользователя"   @click="imgUser">
                            </div>
                            <v-layout row >
                                <v-text-field label="Имя пользователя" v-model="user.name"  required></v-text-field>
                            </v-layout>

                            <v-layout row>
                                <v-text-field label="Email (логин)" v-model="user.email" required ></v-text-field>
                            </v-layout>

                            <v-layout row>
                                <v-text-field label="Новый пароль (минимум 6 символов)" v-model="user.password"  required></v-text-field>
                            </v-layout>

                            <v-layout row>
                                <v-flex>
                                  
                                    <v-select :items="role_list" 
                                              item-text="name" 
                                              item-value="value" 
                                              label="Права доступа" 
                                              autocomplete single-line
                                              v-model="user.role"
                                              auto prepend-icon="person">
                                    </v-select>
                                </v-flex>
                            </v-layout>

                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-flex sm12>
                            <v-btn @click="submit" color="primary">Обновить пользователя</v-btn>
                        </v-flex>
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
                user: {},
                role_list: [
                    {
                        value: 1,
                        name: 'Администратор'
                    },
                    {
                        value: 2,
                        name: 'Редактор'
                    }
                ]

            };
        },
        created: function () {
            this.getUser();
        },
        methods: {
            imgUser(){
                var lfm = function(options, cb) {
                    var route_prefix = (options && options.prefix) ? options.prefix : '/laravel-filemanager';
                    window.open(route_prefix + '?type=' + options.type || 'file', 'FileManager', 'width=900,height=600');
                    window.SetUrl = cb;
                };
                lfm({type: 'image', prefix: '/laravel-filemanager'}, function(url, path) {document.getElementById("urlIMG").src = path;});
            },
            deleteUser(){
                this.axios.delete('/api/users/' + this.$route.params.id).then((response) => {
                    this.$notify({
                        group:'info',
                        type: 'success',
                        title: 'Успех',
                        text: 'Пользователь удален!'
                    });
                    this.$router.push({name:'Blog'});
                }).catch(function (error) {
                  console.log();
                });

            },
            getUser() {
                let uri = '/api/users/' + this.$route.params.id + '/edit';
                this.axios.get(uri).then((response) => {
                    this.user = response.data;
                    console.dir(this.user);
                });
            },
            submit() {
                this.user.img =  document.getElementById("urlIMG").src;
                let uri = '/api/users/' + this.$route.params.id ;
                console.log(this.user);
                this.axios.patch(uri, this.user ).then((response) => {
                    this.backRoute();
                }).catch(function (error) {
                    console.log(error);
                });
            },
            backRoute(){
                this.$router.go(-1)
            }
        }
    };
</script>

<style>
    #urlIMG {max-width: 100%;max-height: 100%}
    .imgUser {height: 100px; width: 100%; text-align: center; cursor: pointer}
</style>