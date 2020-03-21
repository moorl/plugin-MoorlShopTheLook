<?php declare(strict_types=1);

namespace MoorlCmsShopTheLook\Content;

use Shopware\Core\Content\Media\Cms\ImageCmsElementResolver;

class MoorlShopTheLookTypeDataResolver extends ImageCmsElementResolver
{
    public function getType(): string
    {
        return 'moorl-shop-the-look';
    }
}
