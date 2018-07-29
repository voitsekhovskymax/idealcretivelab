<template>
    <v-container grid-list-md text-xs-center>
        <v-card>
            <v-toolbar color="blue darken-2" dark>
                <v-btn icon @click="backRoute">
                    <v-icon>chevron_left</v-icon>
                </v-btn>
                <v-spacer></v-spacer>
                <v-toolbar-title>Новый слайдер</v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
                <v-layout row wrap>
                    <v-flex xl8 lg8 md8 sm12 xs12>
                        <div v-for="item in slider.slides">
                            <div class="slide">
                                <v-btn icon color="white" @click="deleteSlide(item.local_name)" class="deleteSlideBtn">
                                    <v-icon>delete</v-icon>
                                </v-btn>

                                <v-layout row class="new_layout">
                                    <v-flex xs5>
                                        <div class="image_area">
                                            <img v-bind:id="item.local_name" :src="item.img" alt="Картинка слайда"
                                                 title="нажмитедля добавления слайда"
                                                 @click="imgCreate(item.local_name)">
                                        </div>
                                    </v-flex>
                                    <v-flex xs7>
                                        <v-tabs>
                                            <v-tabs-bar>
                                                <v-tabs-item ripple :href="'#all'+item.local_name">Основное
                                                </v-tabs-item>
                                                <v-tabs-item ripple :href="'#seo'+item.local_name">SEO</v-tabs-item>
                                                <v-tabs-slider color="yellow"></v-tabs-slider>
                                            </v-tabs-bar>
                                            <v-tabs-items>
                                                <v-tabs-content :id="'all'+item.local_name">
                                                    <v-card flat>
                                                        <v-text-field v-model="item.title" label="Заголовок слайда"
                                                                      hide-details></v-text-field>
                                                        <v-text-field v-model="item.caption" label="Описание слайда"
                                                                      hide-details></v-text-field>
                                                        <v-text-field v-model="item.url" label="Url слайда"
                                                                      hide-details></v-text-field>
                                                        <v-checkbox v-model="item.new_window"
                                                                    label="Открыть сслыку в новом окне"></v-checkbox>
                                                    </v-card>
                                                </v-tabs-content>
                                                <v-tabs-content :id="'seo'+item.local_name">
                                                    <v-card flat>
                                                        <v-text-field v-model="item.seo_title" label="SEO заголовок"
                                                                      hide-details></v-text-field>
                                                        <v-text-field v-model="item.seo_alt" label="SEO alt картинки"
                                                                      hide-details></v-text-field>
                                                    </v-card>
                                                </v-tabs-content>
                                            </v-tabs-items>
                                        </v-tabs>
                                    </v-flex>
                                </v-layout>
                            </div>
                            <v-divider></v-divider>
                        </div>
                        <v-btn color="red" dark @click="addSlide">
                            Добавить новый слайд
                        </v-btn>
                    </v-flex>
                    <v-flex xl4 lg4 md4 sm12 xs12>
                        <v-card>
                            <v-card-text>
                                <v-container>
                                    <v-layout row>
                                        <v-flex xs-12>
                                            <v-text-field v-model="slider.title" label="Заголовок слайдера"
                                                          hide-details></v-text-field>
                                            <v-text-field v-model="slider.content" label="Описание слайдера"
                                                          hide-details></v-text-field>
                                            <v-checkbox v-model="slider.hover_pause"
                                                        label="Пауза при наведении"></v-checkbox>
                                            <v-text-field v-model="slider.effect_name" label="Имя эффекта"
                                                          hide-details></v-text-field>
                                            <v-text-field v-model="slider.pause_speed"
                                                          label="Скорость прокрутки слайдов"
                                                          hide-details></v-text-field>
                                            <v-text-field v-model="slider.animation_speed" label="Скорость анимации"
                                                          hide-details></v-text-field>
                                            <v-checkbox v-model="slider.pager" label="pager"></v-checkbox>
                                            <v-checkbox v-model="slider.controls" label="controls"></v-checkbox>
                                            <v-text-field v-model="slider.easing" label="easing"
                                                          hide-details></v-text-field>
                                            <v-btn color="red" dark @click="submit">
                                                Добавить слайдер
                                            </v-btn>
                                        </v-flex>
                                    </v-layout>
                                </v-container>
                            </v-card-text>
                        </v-card>
                    </v-flex>
                </v-layout>
            </v-card-text>
        </v-card>
    </v-container>

</template>

<script>

    var count_slides = 0;
    export default {
        data() {
            return {
                slider: {
                    slides: [],
                    title: 'Заголовок слайдера',
                    content: "Контент слайдера",
                    hover_pause: true,
                    effect_name: 'fade',
                    pause_speed: "3000",
                    animation_speed: '3000',
                    pager: true,
                    controls: true,
                    easing: "easing"
                },
                slide: {
                    local_name: '',
                    title: '',
                    img: '/backend/assets/img/no-image.png',
                    caption: '',
                    url: '',
                    new_window: false,
                    seo_title: '',
                    seo_alt: ''
                }
            };
        },
        created: function () {
            this.init();
        },
        methods: {
            init() {

            },
            imgCreate(name_slide) {
                console.log(name_slide);
                var lfm = function (options, cb) {
                    var route_prefix = (options && options.prefix) ? options.prefix : '/laravel-filemanager';
                    window.open(route_prefix + '?type=' + options.type || 'file', 'FileManager', 'width=900,height=600');
                    window.SetUrl = cb;
                };
                lfm({type: 'image', prefix: '/laravel-filemanager'}, function (url, path) {
                    document.getElementById(name_slide).src = path;

                });

            },
            addSlide() {
                var newSlide = {
                    local_name: 'slide_' + count_slides,
                    title: '',
                    img: '/backend/assets/img/no-image.png',
                    caption: '',
                    url: '',
                    new_window: false,
                    seo_title: '',
                    seo_alt: ''
                };
                this.slider.slides.push(newSlide);
                count_slides++;
            },
            deleteSlide(name) {
                console.log(name);
                for (var i = 0; i < this.slider.slides.length; i++) {
                    if (this.slider.slides[i]['local_name'] == name) {
                        this.slider.slides.splice(i, 1);
                    }
                }
            },
            submit() {
                console.log(this.slider);

                for (var i = 0; i < this.slider.slides.length; i++) {
                    let img_slide = this.slider.slides[i]['local_name'];
                    this.slider.slides[i].img = document.getElementById(img_slide).src;
                }


                this.axios.post('/api/sliders', this.slider).then((response) => {
                    this.$notify({
                        group: 'info',
                        type: 'success',
                        title: 'Успех',
                        text: 'Новый слайдер создан!'
                    });
                    console.log("Response ☻ ")
                    console.log(response);

                    this.$router.push({name: 'sliders'});
                }).catch(function (error) {
                    console.log("Error ↓ ♥ ")
                    console.log(error);
                });
            },
            backRoute() {
                this.$router.go(-1)
            }

        }
    };


</script>


<style>
    .slide {
        position: relative;
        border: 1px solid #e0e0e0;
    }

    .deleteSlideBtn {
        position: absolute;
        top: 0px;
        right: 0px;
        z-index: 1;
    }

    .slide .flex {
        padding: 0px
    }

    .new_layout {
        margin: 0px !Important
    }

    .image_area img {
        max-width: 100%;
        height: auto;
    }

    .image_area {
        cursor: pointer;
        margin: 5px;
        border: 2px dashed #b3b3b3;
    }
</style>