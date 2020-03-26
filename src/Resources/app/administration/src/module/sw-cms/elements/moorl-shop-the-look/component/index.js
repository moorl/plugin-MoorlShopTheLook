const { Component, Application, Mixin } = Shopware;
import template from './index.html.twig';
import './index.scss';

Component.register('sw-cms-el-moorl-shop-the-look', {
    template,

    mixins: [
        Mixin.getByName('cms-element')
    ],

    computed: {
        mediaUrl() {
            const context = Shopware.Context.api;
            const elemData = this.element.data.media;
            const mediaSource = this.element.config.media.source;

            if (mediaSource === 'mapped') {
                const demoMedia = this.getDemoValue(this.element.config.media.value);

                if (demoMedia && demoMedia.url) {
                    return demoMedia.url;
                }
            }

            if (elemData && elemData.id) {
                return this.element.data.media.url;
            }

            if (elemData && elemData.url) {
                return `${context.assetsPath}${elemData.url}`;
            }

            return `${context.assetsPath}/administration/static/img/cms/preview_mountain_large.jpg`;
        },

        priceTotal() {
            const elemData = this.element.data.products;

            console.log(elemData);

            let price = 0;

            if (elemData) {
                if (elemData) {
                    elemData.forEach(function (product) {
                        if (product.price) {
                            price = price + product.price[0].gross;
                        }
                    });
                }
            }

            return price;

        }
    },

    watch: {
        cmsPageState: {
            deep: true,
            handler() {
                this.$forceUpdate();
            }
        }
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('moorl-shop-the-look');
            this.initElementData('moorl-shop-the-look');
        }
    },

    filters: {
        numberFormat: function (value) {
            return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value)
        }
    }
});
