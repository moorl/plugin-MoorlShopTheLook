<?php declare(strict_types=1);

namespace MoorlCmsShopTheLook;

use MoorlFoundation\Core\PluginFoundation;
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

        /* @var $foundation PluginFoundation */
        $foundation = $this->container->get(PluginFoundation::class);
        $foundation->setContext($context->getContext());

        $foundation->removeCmsSlots(['moorl-shop-the-look']);
        $foundation->removeCmsBlocks(['moorl-shop-the-look']);
    }
}
