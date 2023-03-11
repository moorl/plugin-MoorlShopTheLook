<?php declare(strict_types=1);

namespace MoorlCmsShopTheLook;

use Shopware\Core\Framework\Plugin;

class MoorlCmsShopTheLook extends Plugin
{
    final public const NAME = 'MoorlCmsShopTheLook';
    final public const DATA_CREATED_AT = '2003-03-03 23:0:02.000';
    final public const PLUGIN_TABLES = [];
    final public const SHOPWARE_TABLES = [
        'cms_page',
        'cms_page_translation',
        'cms_section',
        'cms_block',
        'category',
        'product'
    ];
}
