<?php

error_reporting(0);

switch (key($_GET)) {
    case 'new':
        // Checking ajax request
        $fn = (isset($_SERVER['HTTP_X_FILENAME']) ? $_SERVER['HTTP_X_FILENAME'] : false);
        if ($fn) {
            // Generate new file ID
            $fileId = rand(0, 100000);

            // If some file already have this name, we generate a new id
            while (file_exists('uploads/' . $fileId . '.' . $_GET['extension'])) {
                $fileId = rand(0, 100000);
            }

            // Put image in file and return status to javascript
            if (file_put_contents('uploads/' . $fileId . '.' . $_GET['extension'], file_get_contents('php://input')) === false) {
                echo '{"success": false}';
            } else {
                echo '{"success": true, "fileID": ' . $fileId . '}';
            }

            // stop script
            exit();
        }
        break;

    case 'create':
        // Disable jpeg warnings from GD
        ini_set("gd.jpeg_ignore_warning", 1);

        // Get file ID
        $fileId = $_GET['create'];

        // If file is jpg file, convert them to png and delete the old jpg file
        // cause png rocks <3
        if (file_exists('uploads/' . $fileId) . '.JPG') {
            rename('uploads/' . $fileId . '.JPG', 'uploads/' . $fileId . '.jpg');
        }
        if (file_exists('uploads/' . $fileId) . '.PNG') {
            rename('uploads/' . $fileId . '.PNG', 'uploads/' . $fileId . '.png');
        }

        if (file_exists('uploads/' . $fileId . '.jpg')) {
            $image = imagecreatefromjpeg('uploads/' . $fileId . '.jpg');
            imagepng($image, 'uploads/' . $fileId . '.png');
            unlink('uploads/' . $fileId . '.jpg');
        }


        // Set file path
        $filename = 'uploads/' . $fileId . '.png';
        $imageSource = imagecreatefrompng($filename);

        // Get height and width from file
        list($width, $height) = getimagesize($filename);

        // Set final width and height for synergefication
        $dest_width  = 600;
        $dest_height = 920;

        // Get ratio of old and next picture
        $original_aspect = $width / $height;
        $dest_aspect     = $dest_width / $dest_height;

        // Set new width and new height
        if ($original_aspect > $dest_aspect) {
            $new_height = $dest_height;
            $new_width  = $width / ($height / $dest_height);
        } else {
            $new_width  = $dest_width;
            $new_height = $height / ($width / $dest_width);
        }

        // Create new image and put them in with resize and crop
        $imageDest = imagecreatetruecolor($dest_width, $dest_height);
        imagecopyresampled($imageDest, $imageSource, 0 - ($new_width - $dest_width) / 2, 0 - ($new_height - $dest_height) / 2, 0, 0, $new_width, $new_height, $width, $height);

        // Grayscale the photo
        imagefilter($imageDest, IMG_FILTER_GRAYSCALE);

        // Get number of pixels from line and columns
        $img_x = imagesx($imageDest);
        $img_y = imagesy($imageDest);

        // Get darkest pixel from photo
        $img_darkest = 15066597;
        for ($x = 0; $x < $img_x; ++$x)
        {
            for ($y = 0; $y < $img_y; ++$y)
            {
                $rgb = imagecolorat($imageDest, $x, $y);
                if ($rgb < $img_darkest) {
                    $img_darkest = $rgb;
                }
            }
        }

        // Alpha mode saving
        imagealphablending($imageDest, true);
        imagesavealpha($imageDest, true);

        // Change pixels colors
        for ($x = 0; $x < $img_x; ++$x)
        {
            for ($y = 0; $y < $img_y; ++$y)
            {
                // Get rgb and luma from color
                $rgb    = imagecolorat($imageDest, $x, $y);
                $colors = imagecolorsforindex($imageDest, $rgb);

                // Prevent divide by zero if black pixel
                if ($rgb == 0) {
                    $rgb = 1;
                }

                // Set luma
                $luma = $colors['red'] * 0.21 + $colors['green'] * 0.72 + $colors['blue'] * 0.07;

                // Change pixel
                $color_alpha = imagecolorallocatealpha($imageDest, 97, 36, 117, $luma/2);
                imagesetpixel($imageDest, $x, $y, $color_alpha);
                imagecolordeallocate($imageDest, $color_alpha);
            }
        }

        // Upscale brightness
        imagefilter($imageDest, IMG_FILTER_BRIGHTNESS, 40);
        // Put new picture in file
        if (imagepng($imageDest, $filename)) {
            // Add the logo to the picture because it's craaaaazy
            $imageSource = imagecreatefrompng('img/logofilter.png');
            $filter      = imagecreatefrompng($filename);

            // Create new file
            imagecopy($filter, $imageSource, 0, 0, 0, 0, 600, 920);
            if (imagepng($filter, $filename)) {
                echo '{"success": true, "fileID": ' . $fileId . '}';
            } else {
                unlink($filename);
                echo '{"success": false}';
            }
        } else {
            unlink($filename);
            echo '{"success": false}';
        }
        exit();
        break;
    case 'card':
        if ($_GET['card'] != null) {
            $cardId = $_GET['card'];
            include 'tpl/card.php';
        } else {
            header('location:http://cartes.synerghetic.net');
        }
        break;
    default:
        include 'tpl/main.php';
        break;
}
