<?php

/**
 *  package OpenEMR
 *  link    https://www.open-emr.org
 *  author  Sherwin Gaddis <sherwingaddis@gmail.com>
 *  Copyright (c) 2022.
 *  All Rights Reserved
 */

use OpenEMR\Events\User\UserCreatedEvent;
use OpenEMR\Menu\MenuEvent;
use OpenEMR\Menu\PatientMenuEvent;
use OpenEMR\Core\Header;

function newDashboard1ModuleMenuItem(MenuEvent $event)
{
    $menu = $event->getMenu();
    $menuItem = new stdClass();

    $menuItem->requirement = 0;
    $menuItem->target = 'newDasboard';
    $menuItem->menu_id = 'newDashboard';
    $menuItem->label = xlt("New Dashboard");
    $menuItem->url = "/interface/modules/custom_modules/dynamicDashboard/dist/index.html#/dashboard";
    $menuItem->children = [];
    $menuItem->acl_req = [];
    $menuItem->global_req = [];
    foreach ($menu as $item => $val) {
        if ($val->menu_id == 'popup') {
		array_splice($menu, $item+1, 0, [$menuItem]);
        }
    }

    $event->setMenu($menu);

    return $event;
}
$eventDispatcher->addListener(MenuEvent::MENU_UPDATE, 'newDashboard1ModuleMenuItem');
?>
