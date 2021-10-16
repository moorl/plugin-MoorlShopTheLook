const Application = Shopware.Application;
import './component';
import './config';
import './preview';

const Criteria = Shopware.Data.Criteria;
const criteria = new Criteria();
criteria.addAssociation('cover');

Application.getContainer('service').cmsService.registerCmsElement({
    name: 'moorl-shop-the-look',
    label: 'sw-cms.elements.moorl-shop-the-look.title',
    component: 'sw-cms-el-moorl-shop-the-look',
    configComponent: 'sw-cms-el-config-moorl-shop-the-look',
    previewComponent: 'sw-cms-el-preview-moorl-shop-the-look',
    defaultConfig: {
        products: {
            source: 'static',
            value: [],
            required: true,
            entity: {
                name: 'product',
                criteria: criteria
            }
        },
        media: {
            source: 'static',
            value: null,
            required: true,
            entity: {
                name: 'media',
                criteria: new Criteria()
            }
        },
        videoActive: {
            source: 'static',
            value: false
        },
        custom1: {
            source: 'static',
            value: ""
        },
        custom2: {
            source: 'static',
            value: ""
        },
        custom3: {
            source: 'static',
            value: ""
        },
        custom4: {
            source: 'static',
            value: ""
        },
        productMediaHotspots: {
            source: 'static',
            value: {}
        },
        style: {
            source: 'static',
            value: 'standard'
        },
        enableList: {
            source: 'static',
            value: true
        },
        enablePrices: {
            source: 'static',
            value: true
        },
        enableAddToCart: {
            source: 'static',
            value: true
        },
        enableDirectUrl: {
            source: 'static',
            value: false
        },
        enableAnimatedHotspots: {
            source: 'static',
            value: true
        }
    }
});
