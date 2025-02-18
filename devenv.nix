{
  pkgs,
  lib,
  config,
  inputs,
  ...
}:

{
  dotenv.disableHint = true;

  packages = [ pkgs.git ];

  enterTest = ''
    git --version
  '';

  languages.javascript.enable = true;
  languages.javascript.npm.enable = true;
  languages.javascript.yarn.enable = true;
  languages.javascript.yarn.install.enable = true;
  languages.nix.enable = true;
  languages.typescript.enable = true;

  pre-commit.hooks.eslint.enable = true;
  pre-commit.hooks.eslint.settings.binPath = "node_modules/.bin/eslint";
  pre-commit.hooks.nixfmt-rfc-style.enable = true;
  pre-commit.hooks.prettier.enable = true;
}
