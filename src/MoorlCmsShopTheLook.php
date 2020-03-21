<?php declare(strict_types=1);

namespace MoorlCmsShopTheLook;

use MoorlFoundation\Core\PluginHelpers;
use Shopware\Core\Framework\Plugin;
use Shopware\Core\Framework\Plugin\Context\UninstallContext;
use Symfony\Component\Config\FileLocator;
use Symfony\Component\DependencyInjection\ContainerBuilder;
use Symfony\Component\DependencyInjection\Loader\XmlFileLoader;

class MoorlCmsShopTheLook extends Plugin
{
    public function build(ContainerBuilder $container): void
    {
        parent::build($container);

        $loader = new XmlFileLoader($container, new FileLocator(__DIR__ . '/Content/DependencyInjection'));
        $loader->load('media.xml');
    }

    public function uninstall(UninstallContext $context): void
    {
        parent::uninstall($context);

        if ($context->keepUserData()) {
            return;
        }

        PluginHelpers::removeCmsBlocks($this->container, $context->getContext(), [
            'moorl-shop-the-look-three-column'
        ]);

        PluginHelpers::removeCmsSlots($this->container, $context->getContext(), [
            'moorl-shop-the-look'
        ]);
    }
}
