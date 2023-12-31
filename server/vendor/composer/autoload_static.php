<?php

// autoload_static.php @generated by Composer

namespace Composer\Autoload;

class ComposerStaticInitafc6b92398455193e0e7791c12fe83c8
{
    public static $files = array (
        'cfe4039aa2a78ca88e07dadb7b1c6126' => __DIR__ . '/../..' . '/config.php',
    );

    public static $prefixLengthsPsr4 = array (
        'A' => 
        array (
            'App\\' => 4,
        ),
    );

    public static $prefixDirsPsr4 = array (
        'App\\' => 
        array (
            0 => __DIR__ . '/../..' . '/App',
        ),
    );

    public static function getInitializer(ClassLoader $loader)
    {
        return \Closure::bind(function () use ($loader) {
            $loader->prefixLengthsPsr4 = ComposerStaticInitafc6b92398455193e0e7791c12fe83c8::$prefixLengthsPsr4;
            $loader->prefixDirsPsr4 = ComposerStaticInitafc6b92398455193e0e7791c12fe83c8::$prefixDirsPsr4;

        }, null, ClassLoader::class);
    }
}
