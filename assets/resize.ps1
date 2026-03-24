Add-Type -AssemblyName System.Drawing
$img = [System.Drawing.Image]::FromFile((Join-Path $PWD 'assets\logo.png'))
$sizes = @(16, 32, 48, 64, 80, 96, 128)
foreach ($s in $sizes) {
    $bmp = New-Object System.Drawing.Bitmap($img, $s, $s)
    $path = Join-Path $PWD "assets\icon-$s.png"
    $bmp.Save($path, [System.Drawing.Imaging.ImageFormat]::Png)
    $bmp.Dispose()
}
$img.Dispose()
