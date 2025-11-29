import { BannerHome } from '@/pages/app/home/banner-home'
import { ContentHome } from '@/pages/app/home/content-home'

export function Home() {
  return (
    <div className="w-full">
      <div className="w-full bg-[url(public/imgs/home/img-banner-home.png)] bg-cover bg-no-repeat px-5">
        <div className="mx-auto max-w-[1250px] px-5">
          <BannerHome />
        </div>
      </div>

      <div className="mx-auto max-w-[1250px] p-5">
        <ContentHome />
      </div>
    </div>
  )
}
