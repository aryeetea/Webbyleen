import { json, mapProjectRow, methodNotAllowed, normalizePackageType, readProjects, readRequestBody, removeScreenshots, requireAdmin } from '../../_shared/core.js'
import { supabase } from '../../supabase.js'

function getRouteId(req) {
  const value = req.query?.id

  if (Array.isArray(value)) {
    return value[0] || ''
  }

  return typeof value === 'string' ? value : ''
}

export default async function handler(req, res) {
  const session = requireAdmin(req, res)

  if (!session) {
    return
  }

  const id = getRouteId(req)

  if (!id) {
    return json(res, 400, { error: 'Project id is required.' })
  }

  if (req.method === 'PATCH') {
    try {
      const body = readRequestBody(req)
      const packageType = await normalizePackageType(body.packageType)

      if (!packageType) {
        return json(res, 400, { error: 'A valid package type is required.' })
      }

      const { data, error } = await supabase
        .from('portfolio_projects')
        .update({ package_type: packageType })
        .eq('id', id)
        .select()
        .maybeSingle()

      if (error) {
        throw new Error(error.message)
      }

      if (!data) {
        return json(res, 404, { error: 'Project not found' })
      }

      return json(res, 200, mapProjectRow(data))
    } catch (error) {
      return json(res, 500, { error: error.message || 'Could not update this project.' })
    }
  }

  if (req.method === 'DELETE') {
    try {
      const projects = await readProjects()
      const project = projects.find(item => item.id === id)

      if (!project) {
        return json(res, 404, { error: 'Project not found' })
      }

      await removeScreenshots(project.screenshots)

      const { error } = await supabase
        .from('portfolio_projects')
        .delete()
        .eq('id', id)

      if (error) {
        throw new Error(error.message)
      }

      return json(res, 200, { ok: true })
    } catch (error) {
      return json(res, 500, { error: error.message || 'Could not remove this project.' })
    }
  }

  return methodNotAllowed(res, ['PATCH', 'DELETE'])
}
