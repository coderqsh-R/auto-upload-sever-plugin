import { NodeSSH } from "node-ssh"
import { IPluginOptions } from "./type"

class AutoUploadSeverPlugin {
  private ssh
  constructor(public options: IPluginOptions) {
    this.options = options
    this.ssh = new NodeSSH()
  }

  apply(complier: any) {
    complier.hooks.afterEmit.tapAsync("auto", async (compilation: any, callback: () => void) => {
      const { username, password, host, remotePath } = this.options
      const localPath = compilation.outputOptions.path
      await this.connect(username, password, host)
      await this.ssh.execCommand(`rm -rf ${remotePath}`)
      await this.upload(localPath, remotePath)
    })
  }
  /** 建立连接 */
  async connect(username: string, password: string, host: string) {
    try {
      await this.ssh.connect({
        username,
        password,
        host
      })
      console.log(`🚀🚀成功与服务器${host}建立连接🚀🚀🚀`)
    } catch (error) {
      console.log("连接失败", error)
    }
  }

  /** 上传文件 */
  async upload(localPath: string, remotePath: string) {
    try {
      await this.ssh.putDirectory(localPath, remotePath, {
        recursive: true,
        concurrency: 10
      })
      console.log(`✨✨✨上传成功✨✨✨`)
    } catch (error) {
      console.log("❌❌❌上传失败❌❌❌")
    } finally {
      this.ssh.dispose()
      console.log("✌️✌️✌️断开连接✌️✌️✌️")
    }
  }
}

export default AutoUploadSeverPlugin
