const Application = Shopware.Application;
import './component';
import './config';
import './preview';

const Criteria = Shopware.Data.Criteria;
const criteria = new Criteria();
criteria.addAssociation('cover');

Application.getContainer('service').cmsService.registerCmsElement({
    name: 'moorl-shop-the-look',
    label: 'Shop The Look',
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
                name: 'media'
            }
        },
        productMediaHotspots: {
            source: 'static',
            value: {}
        },
        style: {
            source: 'static',
            value: 'standard'
        }
    },
    collect: function collect(elem) {
        const context = Object.assign(
            {},
            Shopware.Context.api,
            { inheritance: true }
        );

        const criteriaList = {};

        Object.keys(elem.config).forEach((configKey) => {
            if (elem.config[configKey].source === 'mapped') {
                return;
            }

            const entity = elem.config[configKey].entity;

            if (entity && elem.config[configKey].value) {
                const entityKey = entity.name;
                const entityData = {
                    value: [...elem.config[configKey].value],
                    key: configKey,
                    searchCriteria: entity.criteria ? entity.criteria : new Criteria(),
                    ...entity
                };

                entityData.searchCriteria.setIds(entityData.value);
                entityData.context = context;

                criteriaList[`entity-${entityKey}`] = entityData;
            }
        });

        return criteriaList;
    }
});
