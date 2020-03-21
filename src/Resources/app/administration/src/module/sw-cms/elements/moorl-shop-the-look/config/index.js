const { Component, Mixin, StateDeprecated } = Shopware;

import template from './index.html.twig';
import './index.scss';

Component.register('sw-cms-el-config-moorl-shop-the-look', {
    template,

    mixins: [
        Mixin.getByName('cms-element')
    ],

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

        mediaStore() {
            return StateDeprecated.getStore('media');
        },

        uploadStore() {
            return StateDeprecated.getStore('upload');
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
            this.element.config.products.value = this.productCollection.getIds();

            this.$set(this.element.data, 'products', this.productCollection);
        },

        onChangeMedia() {
            return this.uploadStore.runUploads(this.uploadTag);
        },

        onImageUpload({ targetId }) {
            this.mediaStore.getByIdAsync(targetId).then((mediaEntity) => {
                this.element.config.media.value = mediaEntity.id;

                if (this.element.data) {
                    this.$set(this.element.data, 'mediaId', mediaEntity.id);
                    this.$set(this.element.data, 'media', mediaEntity);
                }

                this.$emit('element-update', this.element);
            });
        },

        onImageRemove() {
            this.element.config.media.value = null;

            if (this.element.data) {
                this.$set(this.element.data, 'mediaId', null);
                this.$set(this.element.data, 'media', null);
            }

            this.$emit('element-update', this.element);
        },

        onCloseModal() {
            this.mediaModalIsOpen = false;
        },

        onSelectionChanges(mediaEntity) {
            this.element.config.media.value = mediaEntity[0].id;

            if (this.element.data) {
                this.$set(this.element.data, 'mediaId', mediaEntity[0].id);
                this.$set(this.element.data, 'media', mediaEntity[0]);
            }

            this.$emit('element-update', this.element);
        },

        onOpenMediaModal() {
            this.mediaModalIsOpen = true;
        },

        onChangeMinHeight(value) {
            this.element.config.minHeight.value = value === null ? '' : value;

            this.$emit('element-update', this.element);
        },

        onChangeDisplayMode(value) {
            if (value === 'cover') {
                this.element.config.verticalAlign.value = '';
            } else {
                this.element.config.minHeight.value = '';
            }

            this.$emit('element-update', this.element);
        }
    }
});
