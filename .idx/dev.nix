{ pkgs }: {
  channel = "stable-23.11";
  packages = [
    pkgs.nodejs_20
    pkgs.yarn
  ];
  idx = {
    extensions = [
      "dbaeumer.vscode-eslint"
      "esbenp.prettier-vscode"
      "bradlc.vscode-tailwindcss"
    ];
    workspace = {
      onCreate = {
        npm-install = "yarn install --frozen-lockfile --non-interactive --offline --silent --timing";
      };
    };
    previews = {
      enable = true;
      previews = {
        web = {
          command = [
            "yarn"
            "dev"
            "--port"
            "$PORT"
            "--hostname"
            "0.0.0.0"
          ];
          manager = "web";
        };
      };
    };
  };
}
