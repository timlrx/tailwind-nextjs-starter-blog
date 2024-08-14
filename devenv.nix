{
  pkgs,
  lib,
  config,
  inputs,
  ...
}:

{
  packages = [ pkgs.git ];

  enterTest = ''
    git --version
  '';

  languages.javascript.enable = true;
  languages.javascript.yarn.enable = true;
  languages.javascript.yarn.install.enable = true;
  languages.nix.enable = true;
  languages.typescript.enable = true;

  pre-commit.hooks.eslint.enable = true;
  pre-commit.hooks.nixfmt.enable = true;
  pre-commit.hooks.nixfmt.package = pkgs.nixfmt-rfc-style;
  pre-commit.hooks.prettier.enable = true;
}
