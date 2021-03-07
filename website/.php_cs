<?php

require_once __DIR__ . '/tools/PrettierPHPFixer.php';

return PhpCsFixer\Config::create()
    ->registerCustomFixers([
        (new PrettierPHPFixer()),
    ])
    ->setRules([
        'Prettier/php' => true,
        '@PhpCsFixer' => true,
        'php_unit_internal_class' => false,
         'php_unit_test_class_requires_covers' => false,
    ])
;
