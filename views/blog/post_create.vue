<template>
    <v-container>
        <v-card>
            <v-toolbar color="blue darken-2" dark>
                <v-btn icon @click="backRoute">
                    <v-icon>chevron_left</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-toolbar-title>Создание нового поста</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
                <v-layout row wrap>
                <v-flex xl8 lg8 md8 sm12 xs12>
                    <v-card class="pa-0 mt-2">
                        <v-card-text class="pa-0 mt-2">
                            <v-flex xs12>
                                <div class="imgpost">
                                        <img id="urlIMG" :src="post.img" alt=""   @click="imgPost">
                                </div>
                            </v-flex>
                            <v-divider></v-divider>
                            <v-flex xs12>
                                <v-text-field  v-model="post.title"  label="Заголовок поста" full-width  hide-details></v-text-field>
                            </v-flex>
                            <v-divider></v-divider>
                            <v-flex xs12>
                                <tinymce id="note" 
                                         v-model="post.content"
                                         toolbar1="' formatselect | bold italic  strikethrough  forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat'"
                                         toolbar2="' fullscreen | advlist autolink lists link image charmap  preview hr anchor pagebreak | searchreplace wordcount visualblocks visualchars code  | insertdatetime media nonbreaking  table contextmenu directionality | template paste textcolor colorpicker textpattern imagetools toc help  hr'">
                                </tinymce>
                            </v-flex>
                          
                        </v-card-text>
                    </v-card>
                </v-flex>
                <v-flex xl4 lg4 md4 sm12 xs12>
                    <v-card>
                        <v-card-text >
                            <v-layout row wrap>
                                <v-flex xs12>
                                    <v-select
                                            :items="languages"
                                            item-text="name"
                                            item-value="short_name"
                                            v-model="post.lang"
                                            chips
                                            label="Язык статьи"
                                            max-height="auto"
                                    >
                                        <template slot="selection" slot-scope="data">
                                            <v-chip
                                                    @input="data.parent.selectItem(data.item)"
                                                    :selected="data.selected"
                                                    class="chip--select-multi"
                                                    :key="JSON.stringify(data.item)"
                                            >
                                                <v-avatar>
                                                    <img :src="data.item.img">
                                                </v-avatar>
                                                {{ data.item.name }}
                                            </v-chip>
                                        </template>
                                        <template slot="item" slot-scope="data">
                                            <template v-if="typeof data.item !== 'object'">
                                                <v-list-tile-content v-text="data.item"></v-list-tile-content>
                                            </template>
                                            <template v-else>
                                                <v-list-tile-avatar>
                                                    <img v-bind:src="data.item.img"/>
                                                </v-list-tile-avatar>
                                                <v-list-tile-content>
                                                    <v-list-tile-title v-html="data.item.name"></v-list-tile-title>
                                                </v-list-tile-content>
                                            </template>
                                        </template>
                                    </v-select>
                                </v-flex>
                                
                                <v-flex xs6>
                                    <v-dialog ref="dialog"
                                              persistent
                                              v-model="date_post_modal"
                                              lazy
                                              full-width
                                              width="300px"
                                              :return-value.sync="date_post">
                                        <v-text-field slot="activator" label="Выберите дату" v-model="date_post" prepend-icon="event" readonly ></v-text-field>
                                        <v-date-picker v-model="date_post" :first-day-of-week="1" locale="ru-ru" scrollable actions>
                                            <template slot-scope="{ save, cancel }">
                                                <v-card-actions>
                                                    <v-spacer></v-spacer>
                                                    <v-btn flat color="primary" @click="date_post_modal = false">Закрыть</v-btn>
                                                    <v-btn flat color="primary" @click="$refs.dialog.save(date_post)">Выбрать</v-btn>
                                                </v-card-actions>
                                            </template>
                                        </v-date-picker>
                                    </v-dialog>
                                </v-flex>
                                <v-flex xs6>
                                    <v-dialog ref="dialogtime"
                                            persistent
                                              v-model="time_post_modal"
                                              lazy
                                              full-width
                                              width="300px"
                                              :return-value.sync="time_post"
                                    >
                                        <v-text-field slot="activator" label="Выберите время" v-model="time_post"  readonly ></v-text-field>
                                        <v-time-picker v-model="time_post" format="24hr"  locale="ru-ru" scrollable actions>
                                            <template slot-scope="{ save, cancel }">
                                                <v-card-actions>
                                                    <v-spacer></v-spacer>
                                                    <v-btn flat color="primary" @click="cancel">Закрыть</v-btn>
                                                    <v-btn flat color="primary" @click="$refs.dialogtime.save(time_post)">Выбрать</v-btn>
                                                </v-card-actions>
                                            </template>
                                        </v-time-picker>
                                    </v-dialog>
                                </v-flex>
                            </v-layout>
                            <v-divider></v-divider>
                            <v-flex xs12>
                                <v-select
                                        :items="categories"
                                        item-text="title" 
                                        item-value="title"
                                        v-model="post.category"
                                        combobox
                                        chips
                                        label="Категория статьи"
                                        autocomplete
                                ></v-select>
                            </v-flex>
                            <v-divider></v-divider>
                            <v-flex xs12>
                                <v-select
                                        v-model="post.tags"
                                        label="Теги"
                                        :items="tags"
                                        chips
                                        tags
                                        multiple
                                        item-text="title"
                                        item-value="title"
                                ></v-select>
                            </v-flex>
                            <v-divider></v-divider>
                            <v-flex xs12>
                                <v-text-field  v-model="post.seo_title"  label="SEO title"  hint="от 10 символов" full-width ></v-text-field>
                            </v-flex>
                            <v-divider></v-divider>
                            <v-flex xs12>
                                <v-text-field  v-model="post.seo_keywords"  label="SEO keywords"  hint="Перечислите SEO-ключи через запятую" full-width  ></v-text-field>
                            </v-flex>
                            <v-divider></v-divider>
                            <v-flex xs12>
                                <v-text-field  v-model="post.seo_description"  label="SEO description"  hint="SEO описание поста. от 15 слов"  multi-line full-width  ></v-text-field>
                            </v-flex>
                            <v-divider></v-divider>
                            <v-flex xs12>
                                <v-btn color="success" @click="submit">Сохранить</v-btn>
                            </v-flex>
                        </v-card-text>
                    </v-card>
                </v-flex>
                </v-layout>
            </v-card-text>
        </v-card>
    </v-container>
</template>

<script>
    export default {
        data() {
            return {
                post: {
                    img:'/backend/assets/img/no-image.png',
                    lang:'en'
                },
                date_post:'',
                time_post:'',
                date_post_modal:false,
                time_post_modal:false,
                categories:[],
                tags:[],
                select: [],
                languages:[
                    {
                        name:'Английский',
                        img:'  /images/flags/United-Kingdom.png',
                        short_name:'en'
                    },
                    {
                        name:'Русский',
                        img:'  /images/flags/Russia.png',
                        short_name:'ru'
                    },
                    {
                        name:'Немецкий',
                        img:'  /images/flags/Germany.png',
                        short_name:'de'
                    }
                ]
            };
        },
        created: function () {
            this.init();
            this.getCategories();
            this.getTags();
        },
        methods: {
            init(){
                let today = new Date();
                let dd = today.getDate();
                let mm = today.getMonth()+1; //January is 0!
                let yyyy = today.getFullYear();

                let hours = today.getHours(); // => 9
                let minutes = today.getMinutes(); // =>  30

                if(dd<10) {
                    dd = '0'+dd
                }

                if(mm<10) {
                    mm = '0'+mm
                }

                today =  yyyy + '-' + mm + '-' + dd;
                let todaytime = hours + ":" +minutes;
                console.log(today);
                this.date_post = today;
                this.time_post = todaytime;
            },
            getCategories(){
                this.axios.get('/api/post_categories').then((response) => {
                    this.categories = response.data;
                }).catch(function (error) {

                });
            },
            getTags(){
                this.axios.get('/api/tags').then((response) => {
                    this.tags = response.data;
                }).catch(function (error) {

                });
            },
            imgPost(){
                var lfm = function(options, cb) {
                    var route_prefix = (options && options.prefix) ? options.prefix : '/laravel-filemanager';
                    window.open(route_prefix + '?type=' + options.type || 'file', 'FileManager', 'width=900,height=600');
                    window.SetUrl = cb;
                };
                lfm({type: 'image', prefix: '/laravel-filemanager'}, function(url, path) {
                    document.getElementById("urlIMG").src = path;
                  
                });
            },
            submit() {
               
                this.post.img =  document.getElementById("urlIMG").src;
                //2017-12-10 12:17:54
                this.post.published_at  = this.date_post + ' ' + this.time_post+":00";

                console.log(this.post);
                this.axios.post('/api/posts', this.post).then((response) => {
                    this.$notify({
                        group:'info',
                        type: 'success',
                        title: 'Успех',
                        text: 'Новый пост создан!'
                    });
                    this.$router.push({name:'Blog'});
                }).catch(function (error) {
                    this.$notify({
                        group:'info',
                        type: 'error',
                        title: 'Ошибка',
                        text: 'Не получилось создать новый пост..'
                    });
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
    .imgpost {height: 100px; width: 100%; text-align: center; cursor: pointer}
   .divider {margin: 0px !important;}
    #note_ifr {height: 500px !important; ;}
   
</style>