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
                        <v-toolbar-title>Создание нового скилла</v-toolbar-title>
                        <v-spacer></v-spacer>
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

                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>

</template>

<script>
    export default {
        data() {
            return {
                skill: {
                    img: '/backend/assets/img/no-image.png'
                },
            };
        },
        created: function () {
            this.init();
        },
        methods: {
            init() {

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
                this.axios.post('/api/skills', this.skill).then((response) => {
                    this.$notify({
                        group: 'info',
                        type: 'success',
                        title: 'Успех',
                        text: 'Новый скилл создан!'
                    });
                    this.$router.push({name: 'skills'});
                }).catch(function (error) {
                    this.$notify({
                        group: 'info',
                        type: 'error',
                        title: 'Ошибка',
                        text: 'Не получилось создать новое портфолио..'
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