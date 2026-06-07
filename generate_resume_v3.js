const ExcelJS = require('exceljs');
const path = require('path');

async function main() {
  const wb = new ExcelJS.Workbook();
  wb.creator = '紺野';
  wb.created = new Date();

  // ======== 共通スタイル定義 ========
  const fontBase = { name: 'Meiryo UI', size: 10 };
  const fontTitle = { name: 'Meiryo UI', size: 16, bold: true };
  const fontSection = { name: 'Meiryo UI', size: 12, bold: true };
  const fontSubHead = { name: 'Meiryo UI', size: 10, bold: true };
  const fontSmall = { name: 'Meiryo UI', size: 9, color: { argb: 'FF666666' } };

  const alignWrap = { wrapText: true, vertical: 'top', horizontal: 'left' };
  const alignCenter = { wrapText: true, vertical: 'middle', horizontal: 'center' };

  const borderThin = {
    top: { style: 'thin', color: { argb: 'FFCCCCCC' } },
    left: { style: 'thin', color: { argb: 'FFCCCCCC' } },
    bottom: { style: 'thin', color: { argb: 'FFCCCCCC' } },
    right: { style: 'thin', color: { argb: 'FFCCCCCC' } },
  };

  const fillHeader = {
    type: 'pattern', pattern: 'solid',
    fgColor: { argb: 'FF2B3A55' },
  };
  const fillSubHeader = {
    type: 'pattern', pattern: 'solid',
    fgColor: { argb: 'FFF0F4F8' },
  };

  // ヘルパー: 行に値・スタイルをセットし高さを設定
  function setRow(ws, rowNum, values, opts = {}) {
    const row = ws.getRow(rowNum);
    values.forEach((v, i) => {
      const cell = row.getCell(i + 1);
      cell.value = v;
      cell.font = opts.font || fontBase;
      cell.alignment = opts.alignment || alignWrap;
      if (opts.border) cell.border = borderThin;
      if (opts.fill) cell.fill = opts.fill;
    });
    if (opts.height) row.height = opts.height;
    row.commit();
  }


  // ============================================================
  //  Sheet 1: 職務経歴書（メイン）
  // ============================================================
  const ws1 = wb.addWorksheet('職務経歴書', {
    properties: { defaultColWidth: 20 },
    pageSetup: { paperSize: 9, orientation: 'portrait', fitToPage: true, fitToWidth: 1 },
  });

  ws1.columns = [
    { width: 22 },
    { width: 75 },
  ];

  let r = 1;

  // タイトル
  ws1.mergeCells(r, 1, r, 2);
  setRow(ws1, r, ['職務経歴書'], { font: fontTitle, height: 36, alignment: { ...alignWrap, horizontal: 'center', vertical: 'middle' } });
  r++;

  // 作成日
  setRow(ws1, r, ['作成日', '2026年6月7日'], { height: 22, font: fontSmall, alignment: { ...alignWrap, horizontal: 'right' } });
  r++;
  r++; // 空行

  // ── 職務要約 ──
  ws1.mergeCells(r, 1, r, 2);
  setRow(ws1, r, ['■ 職務要約'], { font: fontSection, height: 28, fill: fillSubHeader, border: true });
  r++;

  // A5:B5 を結合せず、B5にテキストを格納。A5にはラベル。
  setRow(ws1, r, [
    '職務要約',
    'AIコーディングアシスタント「Antigravity 2.0」を駆使した高速開発と、\n' +
    'GitHub Actionsを用いたDevSecOps自動セキュリティ診断\n' +
    '（静的/動的スキャン）を融合させ、安全かつ高品質な\n' +
    'フロントエンド構築を得意とするAI駆動製作者（AI-Driven Creator）です。\n\n' +
    '個人開発で4つの実動プロジェクト\n' +
    '（ポートフォリオサイト、ヘアサロンLP、\n' +
    'カフェブランドサイト、業務改善ダッシュボード）を\n' +
    '構築・公開しており、特に業務効率化を視野に入れた\n' +
    '管理画面UIの実装や、制作会社様との連携を想定した\n' +
    'チーム開発・Git Flow運用、およびデリバリー時の\n' +
    'セキュリティ自動スキャン環境（CodeQL, Trivy, OWASP ZAP）\n' +
    'の統合設計について確かな実証実績を有しています。'
  ], { border: true });
  ws1.getRow(r).getCell(1).font = fontSubHead;
  ws1.getRow(r).getCell(1).alignment = { ...alignWrap, horizontal: 'center', vertical: 'middle' };
  r++;
  r++; // 空行

  // ── 自己PR ──
  ws1.mergeCells(r, 1, r, 2);
  setRow(ws1, r, ['■ 自己PR'], { font: fontSection, height: 28, fill: fillSubHeader, border: true });
  r++;

  // PR 1
  setRow(ws1, r, [
    '自己PR (1)',
    '【1. 制作会社様・開発チームに即戦力で貢献できるコーディング能力】\n\n' +
    '仕様書やFigmaデザインからの正確なマークアップ\n' +
    '（HTML5/CSS3）、およびVanilla JavaScriptを用いた\n' +
    '非同期通信やDOM操作を含むインタラクティブなUIの\n' +
    '実装が可能です。\n\n' +
    'Git/GitHubを用いたバージョン管理やプルリクエストに\n' +
    'よるコード管理の運用を理解しており、\n' +
    '制作会社様の下請け・パートナーとして\n' +
    'リソース不足に即時貢献できます。'
  ], { border: true });
  ws1.getRow(r).getCell(1).font = fontSubHead;
  ws1.getRow(r).getCell(1).alignment = { ...alignWrap, horizontal: 'center', vertical: 'middle' };
  r++;

  // PR 2
  setRow(ws1, r, [
    '自己PR (2)',
    '【2. 業務効率化・SaaSを意識したダッシュボードUIの設計・実装】\n\n' +
    '複雑なKPIデータの一画面集約や進捗管理など、\n' +
    'ビジネス用途の管理画面構築が可能です。\n\n' +
    'CSS GridやFlexboxを駆使したレスポンシブデザインと、\n' +
    'Chart.jsを用いたリアルタイムなデータビジュアライゼー\n' +
    'ションを組み合わせ、動作パフォーマンスと視覚的整理を\n' +
    '高度に両立させたダッシュボードUI\n' +
    '（実動モデル公開中）の実装実績があります。'
  ], { border: true });
  ws1.getRow(r).getCell(1).font = fontSubHead;
  ws1.getRow(r).getCell(1).alignment = { ...alignWrap, horizontal: 'center', vertical: 'middle' };
  r++;

  // PR 3
  setRow(ws1, r, [
    '自己PR (3)',
    '【3. 無償枠を活用した自動防御網（DevSecOps）のインフラ構築】\n\n' +
    '開発スピードだけでなく「納品物の安全性」を重視し、\n' +
    'GitHub Actionsを用いたCI/CD自動診断環境を\n' +
    '設計できます。\n\n' +
    '静的解析（CodeQL）、依存関係スキャン（Trivy）、\n' +
    'デプロイ先の動的スキャン（OWASP ZAP）を自動化し、\n' +
    '低コストで恒常的な脆弱性診断と\n' +
    'アップデート監視（Dependabot）を回す体制を\n' +
    '構築できます。'
  ], { border: true });
  ws1.getRow(r).getCell(1).font = fontSubHead;
  ws1.getRow(r).getCell(1).alignment = { ...alignWrap, horizontal: 'center', vertical: 'middle' };
  r++;
  r++; // 空行

  // ── 基本情報 ──
  ws1.mergeCells(r, 1, r, 2);
  setRow(ws1, r, ['■ 基本情報'], { font: fontSection, height: 28, fill: fillSubHeader, border: true });
  r++;

  const basicInfo = [
    ['氏名', '紺野 ※下のお名前はご自身でご記入ください'],
    ['生年月日 / 年齢', '※ご自身でご記入ください'],
    ['最寄駅', '※ご自身でご記入ください'],
    ['連絡先（メール）', 'jizhaoganye@gmail.com'],
    ['GitHub', 'https://github.com/jizhaoganye-dev'],
    ['ポートフォリオ', 'https://jizhaoganye-dev.github.io/portfolio-site/'],
    ['稼働開始可能時期', '即日対応可能'],
    ['希望単価', 'ご相談'],
  ];

  basicInfo.forEach(([label, value]) => {
    setRow(ws1, r, [label, value], { height: 24, border: true, font: fontBase });
    ws1.getRow(r).getCell(1).font = fontSubHead;
    r++;
  });


  // ============================================================
  //  Sheet 2: テクニカルスキル一覧
  // ============================================================
  const ws2 = wb.addWorksheet('テクニカルスキル', {
    pageSetup: { paperSize: 9, orientation: 'landscape', fitToPage: true, fitToWidth: 1 },
  });

  ws2.columns = [
    { width: 16 },
    { width: 24 },
    { width: 11 },
    { width: 14 },
    { width: 60 },
  ];

  r = 1;
  ws2.mergeCells(r, 1, r, 5);
  setRow(ws2, r, ['テクニカルスキル一覧'], { font: fontTitle, height: 36, alignment: { ...alignWrap, horizontal: 'center' } });
  r++;
  r++; // 空行

  // ヘッダ行
  setRow(ws2, r, ['カテゴリ', '技術名', '経験年数', '自己評価', '習得内容・できること'], {
    font: { ...fontSubHead, color: { argb: 'FFFFFFFF' } },
    height: 28,
    border: true,
    fill: fillHeader,
    alignment: alignCenter,
  });
  r++;

  const skills = [
    ['OS', 'Windows', '5年以上', 'B',
      '開発環境の構築、\nコマンドプロンプト/PowerShellの\n基本操作'],
    ['言語', 'HTML5', '1年未満', 'A',
      'W3C標準に準拠したセマンティックな\nコーディング、SEO対策\n（メタタグ、OGP設定）、\nWAI-ARIAを意識した\nアクセシビリティ対応のマークアップ。'],
    ['言語', 'CSS3', '1年未満', 'A',
      'FlexboxおよびCSS Gridを用いた\nレスポンシブレイアウト設計。\nカスタムプロパティを用いた\nカラーテーマ管理、\nSVG描画やキーフレームによる\nリッチな動画風アニメーションの実装。'],
    ['言語', 'JavaScript\n(ES6+)', '1年未満', 'B',
      'DOM操作、非同期処理\n（Fetch API等を用いたデータ連携）、\nHTML5 Audio APIによる音声再生制御、\nオーディオとアニメーションのタイミング同期、\nイベントの委譲と処理構築。'],
    ['ライブラリ', 'Chart.js', '1年未満', 'B',
      'グラフコンポーネントを用いた\nデータの動的描画、\nツールチップのカスタマイズ、\nレスポンシブなグラフエリアの制御。'],
    ['バージョン管理', 'Git / GitHub', '1年未満', 'B',
      'Git Flowに準拠したブランチ作成、\nコンフリクトの解消、\nプルリクエストを通じたチーム開発、\nコミットメッセージの\n明確な命名規則の運用。'],
    ['CI / CD', 'GitHub Actions', '1年未満', 'B',
      'ワークフロー定義（YAML記述）、\nセキュリティ診断・自動ビルド・\n自動デプロイ（GitHub Pages）の\nトリガー連携、\n環境変数（Secrets）管理。'],
    ['セキュリティ', 'CodeQL /\nTrivy', '1年未満', 'B',
      'ソースコード静的スキャン（SAST）\nおよび依存関係スキャンによる\n脆弱性の自動検出と、\n警告に基づく修復対応。'],
    ['セキュリティ', 'OWASP ZAP', '1年未満', 'B',
      'Webアプリケーション公開後の\n動的セキュリティスキャン（DAST）設定、\n不要な警告のフィルタリング定義\n（zap-rules.tsv）による\n診断ノイズの削減。'],
    ['デザイン', 'Figma /\nFigma AI', '1年未満', 'B',
      'デザインカンプからの正確な\nコンポーネント・レイアウト抽出、\nレスポンシブデザインの\nブレイクポイント解釈、\nデザインパーツの軽量書き出し。'],
    ['AIツール', 'Antigravity 2.0', '1年未満', 'A',
      'AIエージェントを用いたペアプログラミング、\n高速プロトタイピング、\n仕様書からのプログラム自動生成指示・コード修正等のディレクション。'],
  ];

  skills.forEach(row => {
    setRow(ws2, r, row, { border: true });
    // カテゴリ列と技術名列はセンター
    ws2.getRow(r).getCell(1).alignment = { ...alignWrap, horizontal: 'center', vertical: 'middle' };
    ws2.getRow(r).getCell(2).alignment = { ...alignWrap, horizontal: 'center', vertical: 'middle' };
    ws2.getRow(r).getCell(3).alignment = { ...alignWrap, horizontal: 'center', vertical: 'middle' };
    ws2.getRow(r).getCell(4).alignment = { ...alignWrap, horizontal: 'center', vertical: 'middle' };
    r++;
  });

  r++;
  setRow(ws2, r, ['※レベル定義の目安：', 'A = 一人称で要件に合わせて実装可能　/　B = 指示があれば実装可能　/　C = 調査しながら実装可能'], {
    font: fontSmall, height: 22,
  });


  // ============================================================
  //  Sheet 3: プロジェクト経歴
  // ============================================================
  const ws3 = wb.addWorksheet('プロジェクト経歴', {
    pageSetup: { paperSize: 9, orientation: 'portrait', fitToPage: true, fitToWidth: 1 },
  });

  ws3.columns = [
    { width: 26 },
    { width: 72 },
  ];

  r = 1;
  ws3.mergeCells(r, 1, r, 2);
  setRow(ws3, r, ['職務経歴（プロジェクト履歴）'], { font: fontTitle, height: 36, alignment: { ...alignWrap, horizontal: 'center' } });
  r++;
  r++;

  // ---- プロジェクト生成ヘルパー ----
  function addProject(ws, startRow, proj) {
    let cr = startRow;

    // プロジェクトタイトル
    ws.mergeCells(cr, 1, cr, 2);
    setRow(ws, cr, [proj.title], { font: { ...fontSubHead, size: 11 }, height: 30, fill: fillSubHeader, border: true });
    cr++;

    // 基本情報
    const meta = [
      ['期間', proj.period],
      ['体制', proj.team],
      ['役割', proj.role],
      ['担当工程', proj.phases],
      ['使用技術\n（言語・FW）', proj.techLang],
      ['使用技術\n（ツール・環境）', proj.techTool],
    ];
    if (proj.techSec) {
      meta.push(['使用技術\n（セキュリティ）', proj.techSec]);
    }
    meta.push(['公開URL', proj.url]);

    meta.forEach(([label, value]) => {
      const h = (label.includes('\n')) ? 36 : 24;
      setRow(ws, cr, [label, value], { height: h, border: true });
      ws.getRow(cr).getCell(1).font = fontSubHead;
      ws.getRow(cr).getCell(1).fill = { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF8F9FA' } };
      cr++;
    });

    // 空行
    cr++;

    // 業務内容
    ws.mergeCells(cr, 1, cr, 2);
    setRow(ws, cr, ['業務内容（具体的な取り組み・実績・工夫点）'], { font: fontSubHead, height: 24, border: true, fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: 'FFF0F4F8' } } });
    cr++;

    // ここで結合を解除し、A列に【取り組み名】、B列に詳細内容を格納する
    proj.details.forEach(detail => {
      const match = detail.text.match(/^【([^】]+)】\n([\s\S]+)$/);
      let label = '取り組み';
      let content = detail.text;
      if (match) {
        label = `【${match[1]}】`;
        content = match[2];
      }
      setRow(ws, cr, [label, content], { border: true });
      ws.getRow(cr).getCell(1).font = fontSubHead;
      ws.getRow(cr).getCell(1).alignment = { ...alignWrap, horizontal: 'center', vertical: 'middle' };
      cr++;
    });

    cr++; // プロジェクト間の空行
    return cr;
  }

  // ─── Project 1 ───
  r = addProject(ws3, r, {
    title: '【No.1】自稼働型BtoBポートフォリオサービスサイト\n「Aegis & Aesthetic」の設計・開発',
    period: '2026年5月 〜 2026年6月（2ヶ月）',
    team: '1名（個人開発）',
    role: '企画、UI/UXデザイン、\nフロントエンド実装、\nCI/CDおよび自動診断構築',
    phases: '要件定義 → 基本設計・詳細設計\n→ コーディング → テスト（脆弱性診断）\n→ デプロイ・環境構築',
    techLang: 'HTML5, CSS3 (Vanilla),\nJavaScript (ES6+), FontAwesome',
    techTool: 'Git/GitHub, GitHub Actions,\nGitHub Pages, Antigravity 2.0',
    techSec: 'CodeQL, Trivy,\nOWASP ZAP, Dependabot',
    url: 'https://jizhaoganye-dev.github.io/portfolio-site/',
    details: [
      { text:
        '【BtoB訴求 of UI設計】\n' +
        'ユーザー層（制作会社や一般企業の経営者）の\n' +
        '直感的理解を促すため、専門用語を前面に出さず\n' +
        '「売上向上と業務効率化」を主軸に置いたコピーおよび\n' +
        '「こんな方におすすめ」セクションを設計。' },
      { text:
        '【インタラクティブ動画ツアーの実装】\n' +
        'Edge Neural TTSによる高品質日本語ナレーション音声（MP3）と、\n' +
        'SVGローディングやレーザースキャン等のCSSキーフレームアニメーションを\n' +
        'ミリ秒単位で同期再生する疑似動画プレイヤー（HTML5 Audio）を自作し、\n' +
        'サービスの強みを60秒で直感的に解説するVideoTourを構築。' },
      { text:
        '【案件相談フォーム（Formspree連携）】\n' +
        '送信処理をJSで制御し、\n' +
        '送信状態（ローディング）および送信成功トーストを\n' +
        '非同期通信（AJAX）にて表示するフォームを構築。' },
      { text:
        '【証拠（エビデンス）提示枠の実装】\n' +
        'Lighthouseによる「Performance 95+」や、\n' +
        'GitHub Actionsでの診断パスの実測スクリーンショットを\n' +
        '埋め込むためのレスポンシブ枠を成果物内に構築。' },
      { text:
        '【成果】\n' +
        '静的・動的スキャンの自動バッジ表示を含む\n' +
        '信頼性の高い情報公開を実現し、\n' +
        '直契約や外注パートナーとしての\n' +
        '「仕事を依頼できる安心感」を実証。' },
    ],
  });

  // ─── Project 2 ───
  r = addProject(ws3, r, {
    title: '【No.2】BtoB向け業務改善ダッシュボード\n「NEXUS DX Portal」のインタラクティブモックアップ開発',
    period: '2026年6月（1ヶ月）',
    team: '1名（個人開発）',
    role: '画面設計、グラフ連携コーディング、\nレスポンシブ実装',
    phases: '画面設計（ダッシュボードレイアウト）\n→ コーディング\n→ ライブラリ連携・データバインド',
    techLang: 'HTML5, CSS Grid Layout,\nJavaScript, Chart.js',
    techTool: 'Git, GitHub, GitHub Pages,\nAntigravity 2.0',
    techSec: null,
    url: 'https://jizhaoganye-dev.github.io/nexus-dx-portal/',
    details: [
      { text:
        '【課題解決（Challenge）】\n' +
        '大量のKPI指標や進行中のタスクを、\n' +
        'スクロールを最小限に抑えて\n' +
        '1画面で俯瞰できる情報整理と\n' +
        'マルチデバイス対応。' },
      { text:
        '【技術的解決（Solution）】\n' +
        'CSS Grid Layoutをフル活用して\n' +
        '高密度ウィジェット配置を設計。\n' +
        'Chart.jsを統合し、稼働データの\n' +
        'リアルタイム線画とグラデーション\n' +
        'スタイリングを実装。\n' +
        'Vanilla JSのDOM操作のみで\n' +
        'タスクの状態（Kanban）を\n' +
        'インタラクティブに操作できる\n' +
        'ロジックを実装。' },
      { text:
        '【成果（Results）】\n' +
        'Lighthouseでのハイスコア測定を達成。\n' +
        '大量のDOM要素を描画しつつも、\n' +
        'モバイル端末でも表示崩れのない\n' +
        '高いパフォーマンスとレスポンシブ対応を\n' +
        '両立し、実務的な業務アプリの\n' +
        '構築力を実証。' },
    ],
  });

  // ─── Project 3 ───
  r = addProject(ws3, r, {
    title: '【No.3】高級ヘアサロン公式サイト\n「LUSTER Shinjuku」（EC・AIチャット統合モデル）',
    period: '2026年5月 〜 2026年6月（2ヶ月）',
    team: '1名（個人開発）',
    role: '企画、UI/UXデザイン、\nフロントエンド実装',
    phases: '要件定義 → デザイン設計\n→ コーディング → テスト・公開',
    techLang: 'HTML5, CSS3,\nJavaScript (ES6+), FontAwesome',
    techTool: 'Git, Figma, GitHub Pages,\nAntigravity 2.0',
    techSec: null,
    url: 'https://jizhaoganye-dev.github.io/luster-shinjuku/',
    details: [
      { text:
        '【課題解決（Challenge）】\n' +
        '高級美容室の上質なブランド世界観を壊さず、\n' +
        '予約やショッピングなどの実動機能を\n' +
        '低ロード時間で実現すること。' },
      { text:
        '【技術的解決（Solution）】\n' +
        'サードパーティ製の重いライブラリを一切排除し、\n' +
        'Vanilla JSとCSS3（GPUアクセラレーション）を\n' +
        '併用した軽量な「スライドイン式サイドカート」\n' +
        'を自作。\n' +
        'アセット（画像等）の遅延ロード設計および\n' +
        'カテゴリー選択式のリアルタイムDOM書き換え\n' +
        'フィルタ機能を実装。' },
      { text:
        '【成果（Results）】\n' +
        'Lighthouseのパフォーマンススコアで\n' +
        '極めて高い実測値を獲得。\n' +
        '実用的な予約チャットUIの配置を含め、\n' +
        'ブランド価値と動作速度を両立した\n' +
        'Webサイトの納品力を実証。' },
    ],
  });

  // ─── Project 4 ───
  r = addProject(ws3, r, {
    title: '【No.4】オーガニックカフェ「CAFÉ COZY」\nブランドサイトおよび自動セキュリティ診断の実証',
    period: '2026年5月 〜 2026年6月（2ヶ月）',
    team: '1名（個人開発）',
    role: 'フロントエンド実装、\n画像アセット最適化、\nCI/CDセキュリティ統合',
    phases: 'デザイン微調整 → コーディング\n→ CI/CDパイプライン構築・\n自動スキャン設定\n→ テスト・デプロイ',
    techLang: 'HTML5, CSS3 (CSS Grid),\nJavaScript',
    techTool: 'GitHub Actions, CodeQL,\nTrivy, OWASP ZAP (DAST),\nAntigravity 2.0',
    techSec: null,
    url: 'https://jizhaoganye-dev.github.io/cafe-cozy/',
    details: [
      { text:
        '【課題解決（Challenge）】\n' +
        '個人開発や小規模コーポレートサイトで\n' +
        '放置されがちな、お問い合わせ送信時の漏洩や\n' +
        '依存ライブラリの脆弱性リスクの自動排除。' },
      { text:
        '【技術的解決（Solution）】\n' +
        '静的解析（CodeQL）、\n' +
        'モジュール脆弱性スキャン（Trivy）、\n' +
        'および疑似ハッキング攻撃による\n' +
        '動的自動脆弱性検証（OWASP ZAP）を\n' +
        'GitHub Actionsワークフローへ結合し、\n' +
        '毎週自動実行される\n' +
        '回帰テスト環境を構築。' },
      { text:
        '【成果（Results）】\n' +
        '画像WebP変換と遅延ロードを徹底し、\n' +
        '高速な初期表示を実現。\n' +
        '自動診断パイプラインの導入により、\n' +
        '改修時も「セキュリティ脆弱性ゼロ」を\n' +
        '担保したデリバリー体制を確立。' },
    ],
  });


  // ============================================================
  //  Sheet 4: ポートフォリオリンク
  // ============================================================
  const ws4 = wb.addWorksheet('ポートフォリオリンク', {
    pageSetup: { paperSize: 9, orientation: 'landscape', fitToPage: true, fitToWidth: 1 },
  });

  ws4.columns = [
    { width: 22 },
    { width: 28 },
    { width: 48 },
    { width: 48 },
    { width: 36 },
  ];

  r = 1;
  ws4.mergeCells(r, 1, r, 5);
  setRow(ws4, r, ['ポートフォリオ・公開リポジトリ一覧'], { font: fontTitle, height: 36, alignment: { ...alignWrap, horizontal: 'center' } });
  r++;
  r++;

  // ヘッダ行
  setRow(ws4, r, ['プロジェクト名', '種別', '公開URL', 'GitHubリポジトリ', '備考'], {
    font: { ...fontSubHead, color: { argb: 'FFFFFFFF' } },
    height: 28,
    border: true,
    fill: fillHeader,
    alignment: alignCenter,
  });
  r++;

  const links = [
    ['Aegis &\nAesthetic',
      'ポートフォリオサイト\n（営業サイト）',
      'https://jizhaoganye-dev.\ngithub.io/portfolio-site/',
      'https://github.com/\njihzhaoganye-dev/\nportfolio-site',
      'BtoB営業対応・\nDevSecOps\n自動診断統合'],
    ['NEXUS DX\nPortal',
      '業務改善\nダッシュボード',
      'https://jizhaoganye-dev.\ngithub.io/nexus-dx-portal/',
      'https://github.com/\njihzhaoganye-dev/\nnexus-dx-portal',
      'KPI一画面集約・\nChart.js連携'],
    ['LUSTER\nShinjuku',
      '高級ヘアサロンLP',
      'https://jizhaoganye-dev.\ngithub.io/luster-shinjuku/',
      'https://github.com/\njihzhaoganye-dev/\nluster-shinjuku',
      'EC・AI\nチャットボット統合'],
    ['CAFÉ COZY',
      'カフェ\nブランドサイト',
      'https://jizhaoganye-dev.\ngithub.io/cafe-cozy/',
      'https://github.com/\njihzhaoganye-dev/\ncafe-cozy',
      'DevSecOps\n4層自動\nセキュリティ診断'],
  ];

  links.forEach(row => {
    setRow(ws4, r, row, { border: true });
    ws4.getRow(r).getCell(1).font = fontSubHead;
    r++;
  });

  r++;
  r++;

  ws4.mergeCells(r, 1, r, 5);
  setRow(ws4, r, ['■ 連絡先・アカウント情報'], { font: fontSection, height: 28, fill: fillSubHeader, border: true });
  r++;

  setRow(ws4, r, ['GitHub', '', 'https://github.com/jizhaoganye-dev'], { height: 24, border: true });
  ws4.getRow(r).getCell(1).font = fontSubHead;
  r++;
  setRow(ws4, r, ['メールアドレス', '', 'jizhaoganye@gmail.com'], { height: 24, border: true });
  ws4.getRow(r).getCell(1).font = fontSubHead;


  // ======== ファイル出力 ========
  const outputPath = path.join(__dirname, '..', 'resume.xlsx');
  await wb.xlsx.writeFile(outputPath);

  console.log('\n✅ resume.xlsx を生成しました！');
  console.log(`📁 保存先: ${outputPath}`);
}

main().catch(err => { console.error(err); process.exit(1); });
