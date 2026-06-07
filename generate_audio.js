const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const audioDir = path.join(__dirname, 'assets', 'audio');

// Ensure audio directory exists
if (!fs.existsSync(audioDir)) {
    fs.mkdirSync(audioDir, { recursive: true });
    console.log('Created directory:', audioDir);
}

// Scene narration texts
const speechTexts = [
    "デザインの美しさと、強固な安全性を両立する。次世代ウェブ制作、イージス・アンド・エステティック。",
    "多くのウェブ制作で放置されがちな脆弱性リスク。しかし、従来の検査手法では、ばくだいなコストと時間がかかります。",
    "この課題を解決するのが、エーアイエージェント、アンティグラビティ・ツーポイントゼロによる超高速実装。仕様書からコードを自律生成し、開発期間を大幅に短縮します。",
    "さらに、ギットハブ無償枠をフル活用した、よんそうの自動防御網を装備。追加費用ゼロで、恒常的な脆弱性診断を実現します。",
    "確かな性能は、実測データが証明します。ライトハウス最高クラスの表示速度と、すべてのセキュリティ自動診断の合格を実証済み。",
    "現在、実績公開にご協力いただける、先着にしゃ様限定の特別モニター枠を募集中です。安全で高速なウェブサイトを、特別価格で構築しましょう。"
];

console.log('Starting audio generation via Edge TTS...');

speechTexts.forEach((text, index) => {
    const outputFile = path.join(audioDir, `scene_${index}.mp3`);
    console.log(`Generating audio for scene ${index}...`);
    
    // Command to execute edge-tts via npx
    // Using ja-JP-NanamiNeural for a natural, premium female voice.
    const command = `npx node-edge-tts -t "${text}" -f "${outputFile}" -v "ja-JP-NanamiNeural" --rate "+0%"`;
    
    try {
        execSync(command, { stdio: 'inherit' });
        console.log(`Successfully generated: ${outputFile}`);
    } catch (error) {
        console.error(`Error generating scene ${index}:`, error.message);
        process.exit(1);
    }
});

console.log('All audio files generated successfully!');
