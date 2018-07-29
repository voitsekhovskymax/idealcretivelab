<template>
    <v-container grid-list-md text-xs-center>
        <v-layout row wrap>
            <v-flex xl6 lg6 md8 sm12 xs12>
                <v-card>
                    <v-toolbar color="blue darken-2" dark>
                        <v-btn icon @click="backRoute">
                            <v-icon>chevron_left</v-icon>
                        </v-btn>
                        <v-spacer></v-spacer>
                        <v-toolbar-title>Редактирование скилла</v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon @click="dialogDeleteSkill = !dialogDeleteSkill">
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </v-toolbar>
                    <v-card-text>
                        <v-flex xs12>
                            <div class="imgpost">
                                <img id="urlIMG" :src="skill.img" alt="" @click="imgPost">
                            </div>
                        </v-flex>
                        <v-divider></v-divider>
                        <v-flex xs12>
                            <v-text-field v-model="skill.title" label="Название скилла" full-width
                                          hide-details></v-text-field>
                        </v-flex>
                    </v-card-text>
                    <v-card-actions>
                        <v-flex xs12>
                            <v-btn color="success" @click="submit">Сохранить</v-btn>
                        </v-flex>
                    </v-card-actions>
                </v-card>
            </v-flex>
        </v-layout>
        <!--MODALS -->
        <v-dialog v-model="dialogDeleteSkill" max-width="500px">
            <v-card>
                <v-card-text>
                    <v-flex sm12>
                        Вы действительно хотите удалить портфолио <b>{{skill.title}} ?</b>
                    </v-flex>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="red" @click="deleteSkill">Удалить</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                skill: {},
                dialogDeleteSkill: false,
            };
        },
        created: function () {
            this.init();
            this.getSkill();

        },
        methods: {
            init() {

            },

            getSkill() {
                let uri = '/api/skills/' + this.$route.params.id + '/edit';
                this.axios.get(uri).then((response) => {
                    this.skill = response.data;

                }).catch(function (error) {
                });


            },
            deleteSkill() {
                this.axios.delete('/api/skills/' + this.$route.params.id).then((response) => {
                    console.log(response.data);
                    this.$notify({
                        group: 'info',
                        type: 'success',
                        title: 'Успех',
                        text: 'Скилл удален!'
                    });
                    this.$router.push({name: 'Portfolio'});
                }).catch(function (error) {
                    this.$notify({
                        group: 'info',
                        type: 'error',
                        title: 'Ошибка',
                        text: 'Удалить пост не получилось.'
                    });
                });

            },
            imgPost() {
                var lfm = function (options, cb) {
                    var route_prefix = (options && options.prefix) ? options.prefix : '/laravel-filemanager';
                    window.open(route_prefix + '?type=' + options.type || 'file', 'FileManager', 'width=900,height=600');
                    window.SetUrl = cb;
                };
                lfm({type: 'image', prefix: '/laravel-filemanager'}, function (url, path) {
                    document.getElementById("urlIMG").src = path;

                });
            },
            submit() {
                this.skill.img = document.getElementById("urlIMG").src;
                console.log(this.skill);
                this.axios.patch('/api/skills/' + this.$route.params.id, this.skill).then((response) => {
                    this.$notify({
                        group: 'info',
                        type: 'success',
                        title: 'Успех',
                        text: 'Умение обновлено!'
                    });
                    this.$router.push({name: 'skills'});
                }).catch(function (error) {
                    this.$notify({
                        group: 'info',
                        type: 'error',
                        title: 'Ошибка',
                        text: 'Не получилось создать новый пост..'
                    });
                });
            },
            backRoute() {
                this.$router.go(-1)
            }

        }
    };


</script>


<style>
    #urlIMG {
        max-width: 100%;
        max-height: 100%
    }

    .imgpost {
        height: 100px;
        width: 100%;
        text-align: center;
        cursor: pointer
    }

    .divider {
        margin: 0px !important;
    }

    #note_ifr {
        height: 300px;
    }

</style>