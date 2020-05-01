const { Component, Mixin } = Shopware;
const { Criteria, EntityCollection } = Shopware.Data;

import template from './index.html.twig';
import './index.scss';

Component.register('sw-cms-el-config-moorl-shop-the-look', {
    template,

    mixins: [
        Mixin.getByName('cms-element')
    ],

    inject: ['repositoryFactory'],

    data() {
        return {
            productCollection: null,
            mediaModalIsOpen: false,
            initialFolderId: null
        };
    },

    computed: {
        productRepository() {
            return this.repositoryFactory.create('product');
        },

        products() {
            if (this.element.data && this.element.data.products && this.element.data.products.length > 0) {
                return this.element.data.products;
            }

            return null;
        },

        productMediaFilter() {
            const criteria = new Criteria(1, 25);
            criteria.addAssociation('cover');

            return criteria;
        },

        productMultiSelectContext() {
            const context = Object.assign({}, Shopware.Context.api);
            context.inheritance = true;

            return context;
        },

        mediaRepository() {
            return this.repositoryFactory.create('media');
        },

        uploadTag() {
            return `cms-element-media-config-${this.element.id}`;
        },

        previewSource() {
            if (this.element.data && this.element.data.media && this.element.data.media.id) {
                return this.element.data.media;
            }

            return this.element.config.media.value;
        }
    },

    created() {
        this.createdComponent();
    },

    methods: {
        createdComponent() {
            this.initElementConfig('moorl-shop-the-look');
            this.initElementData('moorl-shop-the-look');

            this.productCollection = new EntityCollection('/product', 'product', Shopware.Context.api);

            // We have to fetch the assigned entities again
            // ToDo: Fix with NEXT-4830
            if (this.element.config.products.value.length > 0) {
                const criteria = new Criteria(1, 100);
                criteria.addAssociation('cover');
                criteria.setIds(this.element.config.products.value);

                this.productRepository.search(criteria, Object.assign({}, Shopware.Context.api, { inheritance: true }))
                    .then(result => {
                        this.productCollection = result;
                    });
            }

        },

        onProductsChange() {
            const _that = this;

            this.element.config.products.value = this.productCollection.getIds();

            this.element.config.products.value.forEach(function(id) {
                if (!_that.element.config.productMediaHotspots.value[id]) {
                    _that.element.config.productMediaHotspots.value[id] = {
                        top: '50%',
                        left: '50%'
                    };
                }
            });

            this.$set(this.element.data, 'products', this.productCollection);
        },

        async onImageUpload({ targetId }) {
            const mediaEntity = await this.mediaRepository.get(targetId, Shopware.Context.api);

            this.element.config.media.value = mediaEntity.id;

            this.updateElementData(mediaEntity);
        },

        onImageRemove() {
            this.element.config.media.value = null;

            this.updateElementData();
        },

        updateElementData(media = null) {
            this.$set(this.element.data, 'mediaId', media === null ? null : media.id);
            this.$set(this.element.data, 'media', media);

            this.$emit('element-update', this.element);
        },

        onCloseModal() {
            this.mediaModalIsOpen = false;
        },

        onSelectionChanges(mediaEntity) {
            const media = mediaEntity[0];
            this.element.config.media.value = media.id;

            this.updateElementData(media);
        },

        onOpenMediaModal() {
            this.mediaModalIsOpen = true;
        }
    }
});
