import React from 'react';
import { Grid, Typography, Button, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';

import Navbar from '../components/Navbar';

const About = () => {
    const navigate = useNavigate();
  return (
    <div>
        <Navbar />
        <Grid sx={{ ml: "15%", mr: "15%", mb: 4 }}>
            <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
                どうやって計算してるの？
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
                ネット上から待ち時間予想データを収集し、ユーザーが選択したアトラクションの中から一番待ち時間の長い乗り物の待ち時間が最短になる時間枠にそのアトラクションをスケジュール計画に取り入れます。
                ユーザーがパークにいる時間内にできるだけ計画を埋めれるまでこのプロセスを繰り返します。
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
                全てのアトラクションには（体験時間＋誤差）として待ち時間とは別に30分が設けられています。これは、ディズニーシーのタートル・トークがリゾート内で最も所要時間が長く、約30分であることからです。
                また、収集した待ち時間予想のデータが30分刻みで更新されていることから、アトラクションを体験するおすすめ時間枠は30分区切りで計画されています。
                その為、計画に取り込まれたアトラクションは全て（体験終了時刻＝（体験開始時刻＋待ち時間予想＋（体験時間＋誤差＝30分））を切り上げ）となっております。
                提案された計画スケジュールで次のアトラクションの開始時刻が前の終了時刻よりも早いのはこの為です（アトラクションの所要時間を余裕を見て多めに取っているが、予想通りにいけば次のアトラクションには計算上提案された時間枠で乗れる。）
            </Typography>
            <Typography variant="body2" sx={{ mt: 2, mb: 3 }}>
                また、ラインカット（閉園間近により待ち列が終了）されるのが大概のアトラクションでは閉園時刻の約30分前とみて（トイストーリーマニアなどは60分前、カリブの海賊などは5分前という振れ幅があるが）可能な体験開始時刻を閉園の30分前までとして計算してます。
            </Typography>
            <Typography variant="h6" color="primary" sx={{ mt: 3 }}>
                お問合せ
            </Typography>
            <Typography variant="body2" sx={{ mt: 2 }}>
                アルゴリズムに関するご提案や、ご意見はこちらにお願いします。
            </Typography>
            <Link underline="none" variant="body2" color="primary" href="mailto:technotechapps@gmail.com?subject=%E3%80%90CONTACT%20FORM%E3%80%91Tokyo%20Disney%20Resort%20Scheduler"><Button variant="outlined" endIcon={<EmailIcon />} sx={{ mt: 1 }} >Email</Button></Link>
            <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
                Source
            </Typography>
            <Typography variant="body2" sx={{ mb: 3}}>
                <a target="_blank" href="https://icons8.com/icon/12003/palace">Palace</a> icon by <a target="_blank" href="https://icons8.com">Icons8</a>
            </Typography>
            <Button width="500px" style={{ width: 200 }} variant="contained" onClick={()=>{navigate('/')}}>戻る</Button>
        </Grid>
    </div>
  )
}

export default About