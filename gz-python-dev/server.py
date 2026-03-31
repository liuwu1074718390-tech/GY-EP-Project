from collections.abc import AsyncGenerator
from contextlib import asynccontextmanager

from fastapi import FastAPI

from config.env import AppConfig
from config.get_db import init_create_table
from config.get_redis import RedisUtil
from config.get_scheduler import SchedulerUtil
from exceptions.handle import handle_exception
from middlewares.handle import handle_middleware
from module_admin.controller.cache_controller import cache_controller
from module_admin.controller.captcha_controller import captcha_controller
from module_admin.controller.common_controller import common_controller
from module_admin.controller.config_controller import config_controller
from module_admin.controller.dept_controller import dept_controller
from module_admin.controller.dict_controller import dict_controller
from module_admin.controller.job_controller import job_controller
from module_admin.controller.log_controller import log_controller
from module_admin.controller.login_controller import login_controller
from module_admin.controller.menu_controller import menu_controller
from module_admin.controller.notice_controller import notice_controller
from module_admin.controller.online_controller import online_controller
from module_admin.controller.post_controller import post_controller
from module_admin.controller.role_controller import role_controller
from module_admin.controller.server_controller import server_controller
from module_admin.controller.user_controller import user_controller
from module_generator.controller.gen_controller import gen_controller
from module_material.controller.material_standard_controller import material_knowledge_controller, material_standard_controller
from sub_applications.handle import handle_sub_applications
from utils.common_util import worship
from utils.log_util import logger


# 生命周期事件
@asynccontextmanager
async def lifespan(app: FastAPI) -> AsyncGenerator[None, None]:
    logger.info(f'⏰️ {AppConfig.app_name}开始启动')
    worship()
    await init_create_table()
    app.state.redis = await RedisUtil.create_redis_pool()
    await RedisUtil.init_sys_dict(app.state.redis)
    await RedisUtil.init_sys_config(app.state.redis)
    await SchedulerUtil.init_system_scheduler()
    logger.info(f'🚀 {AppConfig.app_name}启动成功')
    yield
    await RedisUtil.close_redis_pool(app)
    await SchedulerUtil.close_system_scheduler()


# 初始化FastAPI对象
app = FastAPI(
    title=AppConfig.app_name,
    description=f'{AppConfig.app_name}接口文档',
    version=AppConfig.app_version,
    lifespan=lifespan,
)

# 挂载子应用
handle_sub_applications(app)
# 加载中间件处理方法
handle_middleware(app)
# 加载全局异常处理方法
handle_exception(app)


# 加载路由列表
controller_list = [
    {'router': login_controller, 'tags': ['登录模块']},
    {'router': captcha_controller, 'tags': ['验证码模块']},
    {'router': user_controller, 'tags': ['系统管理-用户管理']},
    {'router': role_controller, 'tags': ['系统管理-角色管理']},
    {'router': menu_controller, 'tags': ['系统管理-菜单管理']},
    {'router': dept_controller, 'tags': ['系统管理-部门管理']},
    {'router': post_controller, 'tags': ['系统管理-岗位管理']},
    {'router': dict_controller, 'tags': ['系统管理-字典管理']},
    {'router': config_controller, 'tags': ['系统管理-参数管理']},
    {'router': notice_controller, 'tags': ['系统管理-通知公告管理']},
    {'router': log_controller, 'tags': ['系统管理-日志管理']},
    {'router': online_controller, 'tags': ['系统监控-在线用户']},
    {'router': job_controller, 'tags': ['系统监控-定时任务']},
    {'router': server_controller, 'tags': ['系统监控-服务监控']},
    {'router': cache_controller, 'tags': ['系统监控-缓存监控']},
    {'router': common_controller, 'tags': ['通用模块']},
    {'router': gen_controller, 'tags': ['代码生成']},
    {'router': material_standard_controller, 'tags': ['材料标准管理']},
    {'router': material_knowledge_controller, 'tags': ['材料知识库']},
]

for controller in controller_list:
    app.include_router(router=controller.get('router'), tags=controller.get('tags'))
