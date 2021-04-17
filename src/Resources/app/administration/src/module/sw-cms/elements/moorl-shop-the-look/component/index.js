const {Component, Application, Mixin} = Shopware;
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
        },

        calcPercent(id, x, y) {
            let w = this.$refs.hotspotArea.clientWidth;
            let h = this.$refs.hotspotArea.clientHeight;
            let Xpercent = Math.round(x / w * 100);
            let Ypercent = Math.round(y / h * 100);

            this.element.config.productMediaHotspots.value[id].top = Ypercent + '%';
            this.element.config.productMediaHotspots.value[id].left = Xpercent + '%';
        },

        pointerPositionCss(id) {
            try {
                return {
                    top: this.element.config.productMediaHotspots.value[id].top,
                    left: this.element.config.productMediaHotspots.value[id].left
                }
            } catch (exception) {
                return {};
            }
        }
    },

    filters: {
        numberFormat: function (value) {
            return new Intl.NumberFormat('de-DE', {style: 'currency', currency: 'EUR'}).format(value)
        }
    }
});
