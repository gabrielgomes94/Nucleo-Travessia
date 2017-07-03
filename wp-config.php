<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'nucleotravessia_wordpress');

/** MySQL database username */
define('DB_USER', 'viviane');

/** MySQL database password */
define('DB_PASSWORD', 'y4yragabu');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'v%*^<SWXk$r{H(2x#~->A/sS]YYw*Om$!hOsLRIGw^RsGamLXB3}aG@C-,cxW9!A');
define('SECURE_AUTH_KEY',  'j,tt`<?.&OTLC+WHCg>$@U;e!%GEG?l:v->C@PD}aiV3}a4ad{:D1HDU)-a)H&&|');
define('LOGGED_IN_KEY',    '<vY3+jm!Z|r *vBWius_<|6WZ~Z4rFkuV4#r>iv=pz./jt-:+Q;m+`6=Z&|UggQ>');
define('NONCE_KEY',        '`u=Q`Pe@eyIc6OH$mr`mPe&@48Y,sejAFM:fm/s{1c[HoLGtvxk-B!yb`dVlM)@n');
define('AUTH_SALT',        'DH>S9@^xyk5f-;fSkP76?=7Z%*&V|yAI.yMC-[3-o*5bgnxfV.:b:h_+=,9>p!0#');
define('SECURE_AUTH_SALT', 'C rM97LH>Tdo)2hcB!}W$Qd!Xvl<Ra}mB8#E}N>iO[:#/t]sIq/X*L?;h2-U;4vb');
define('LOGGED_IN_SALT',   '^--_[*%.)MMkJ-$B) B~`u!l$6D7.%/78m6_(?N+F$6i!TpKKdk]9,+I1L;~i>=?');
define('NONCE_SALT',       ';4D*c)2j?(gVXxD>A?gF{ I~`^!R-z{TJR>`.y^QuJc>B/=i`&Q-.`_~Rr{&]+vB');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', 'pt_BR');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
