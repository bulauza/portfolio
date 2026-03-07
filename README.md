## 概要

ポートフォリオサイト  
本体はhub/  
成果物はworks/  
に格納するモノレポ構成としている。

## 使用技術

### hub

next, tailwind

### works

#### lp-it-consult

架空のITコンサル会社のLP  
next, SCSS

#### game-brain-training-janken

脳トレじゃんけんゲーム  
JavaScript, HTML/CSS (Git Submodule)

- **Deployment**: GitHub Pages (via GitHub Actions)

## Getting Started

First, run the development server:

```bash
npm run dev
```

## サブモジュールの管理

このプロジェクトは一部の作品（`works/` 配下）を Git サブモジュールとして管理しています。

### 初回クローン時

リポジトリをクローンした直後はサブモジュールのディレクトリが空の状態です。以下のコマンドで中身をダウンロードしてください。

```bash
git submodule update --init --recursive
```

### サブモジュールの更新

専用リポジトリ側で更新があった場合、以下のコマンドで最新の状態（mainブランチ等）を反映できます。

```bash
# 特定のサブモジュールのみ更新する場合
git submodule update --remote works/game-brain-training-janken

# すべてのサブモジュールを一括更新する場合
git submodule update --remote
```

更新後、親リポジトリ（portfolio）側で「参照先の更新」をコミットする必要があります。
